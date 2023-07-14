/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {SafeAreaView, View, Image, FlatList, Text, Modal, Alert , Dimensions} from 'react-native';
import { useForm } from 'react-hook-form';
import { useFocusEffect } from '@react-navigation/native';

import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/auth';
import styles from '../../config/friendspageStyle';

import AppLoader from '../../components/AppLoader';
import CustomButton from '../../components/customButton';
import CustomInput from '../../components/customInput';
import { TouchableOpacity } from 'react-native';

import color from '../../config/colors';

const temp_size = Dimensions.get('window').height / 50;

function FriendsPage() {
    const { user } = useAuth();
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [friend_id, setFriend_id] = useState('placeholder');
    const [modalVisible, setModalVisible] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const {control, handleSubmit, formState: {errors}} = useForm();
    const [addLoading, setAddLoading] = useState(false);
    
    const [items, setItems] = useState([
        {name: 'temp', image:"placeholder", online: true, key: '1'},
    ]);
    const [nearby, setNearby] = useState([
        {name: 'temp', image:"placeholder", code: "code", key: '1'},
    ]);
    const [friendRequestlist, setFriendRequestlist] = useState([
        {name: 'temp', image:"placeholder", key: '1'},
    ])
    async function getItems() {
        setLoading(true);
        let userdata = await supabase.from('profiles').select().eq('id', user.id).single();
        setFriend_id(userdata.data.friend_id);
        let tempfriendlist = userdata.data.friends;
        let friendlistout = [];
        if (tempfriendlist != null) {
            for (var i = 0; i < tempfriendlist.length; i++) {
                let {data} = await supabase.from('profiles').select().eq('friend_id', tempfriendlist[i]).single();
                if (data != null) {
                    let temp = friendlistout;
                    friendlistout = temp.concat([{name: data.name, image: data.imageUrl, online: data.online, key: i}]);
                }
            }
        }

        let tempfriendrequestlist = userdata.data.friendsRequest;
        let friendrequestlistout = [];
        if (tempfriendrequestlist != null) {
            for (var j = 0; j < tempfriendrequestlist.length; j++) {
                let {data} = await supabase.from('profiles').select().eq('friend_id', tempfriendrequestlist[j]).single();
                if (data != null) {
                    let temp = friendrequestlistout;
                    friendrequestlistout = temp.concat([{name: data.name, image: data.imageUrl, key: j}]);
                }
            }
        }
        setItems(friendlistout);
        setFriendRequestlist(friendrequestlistout);
        setLoading(false);
        setRefresh(false);
    }

    async function getNearby() {
        setLoading(true);
        let {data} = await supabase.from('profiles').select('*').limit(5);
        let out = [];
        for (var i = 0; i < data.length; i++) {
            let temp = out;
            out = temp.concat([{name: data[i].name, image: data[i].imageUrl, code: data[i].friend_id, key: i}]);
        }
        setNearby(out);
        setLoading(false);
        setRefresh(false);
    }

    useFocusEffect(
        React.useCallback(() => {
            getItems();
            getNearby();
        }, [])
    );

    useEffect(() => {
        if (refresh) {
            getItems();
            getNearby();
        }
    }, [refresh])

    const addPressed = async input => {
        const keyed_id = input.id;
        const user_id = friend_id;

        console.log(
            "\nAdd friend attempt:" +
            "\nID: " + keyed_id
        );
        if (addLoading) {
            return;
        }
        setAddLoading(true);
        if (keyed_id != user_id) {
            const userData = await supabase
            .from('profiles')
            .select('*')
            .eq('friend_id', user_id)
            .single();
            const friendData = await supabase
                .from('profiles')
                .select('*')
                .eq('friend_id', keyed_id)
                .single();
            if (friendData.error) {
                Alert.alert("ID does not exisit")
            } else if (userData.data.friends.includes(keyed_id)) {
                Alert.alert("user already in your friend list")
            } else if (friendData.data.friendsRequest.includes(user_id)) {
                Alert.alert("Friend request has already been sent to the player")
            } else {
                console.log()
                let friend_list = [];
                if (friendData.data.friendsRequest.length == 0) {
                    friend_list = [user_id];
                } else {
                    friend_list = friendData.data.friendsRequest;
                    let temp = [user_id];
                    friend_list = friend_list.concat(temp);
                }
                await supabase
                    .from('profiles')
                    .update({ 
                        friendsRequest: friend_list,
                    })
                    .eq('friend_id', keyed_id);

                Alert.alert("friend Request sent");
                setRefresh(true);
            }

        } else {
            Alert.alert("Please enter your friend's IDs");
        }
        setAddLoading(false);
    };

    // const accept_friendRequest = async input => {
    //     let friend_list = [];
    //     if (friendData.data.friends.length == 0) {
    //         friend_list = [user_id];
    //     } else {
    //         friend_list = friendData.data.friends;
    //         let temp = [user_id];
    //         friend_list = friend_list.concat(temp);
    //     }
    //     await supabase
    //         .from('profiles')
    //         .update({ 
    //             friends: friend_list,
    //         })
    //         .eq('friend_id', keyed_id);

    //     let user_list = [];
    //     if (userData.data.friends.length == 0) {
    //         user_list = [keyed_id];
    //     } else {
    //         user_list = userData.data.friends;
    //         let temp = [keyed_id];
    //         user_list = user_list.concat(temp);
    //     }
    //     await supabase
    //         .from('profiles')
    //         .update({ 
    //             friends: user_list,
    //         })
    //         .eq('friend_id', user_id);
    // }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <CustomButton type='addFriend' onPress={() => setModalVisible(true)}/>

                <Modal
                    animationType = {'fade'}
                    transparent = {true}
                    visible = {modalVisible}
                >
                    <View style = {styles.menuContainer}>
                        <View style = {styles.menu}>
                            <View style = {styles.menu_top}>
                                <Text style = {styles.menu_header}>Add Friend</Text>
                                <View style={{position: 'absolute', width: '100%', alignItems: 'flex-end'}}>
                                    <CustomButton 
                                        type='cross' 
                                        onPress={() => setModalVisible(false)}
                                    />
                                </View>
                            </View>
                            <View style = {styles.menu_id}>
                                <Text style = {styles.ownID}>your ID: {friend_id}</Text>
                                <View style = {styles.addID}>
                                    <CustomInput 
                                        name = "id"
                                        placeholder = "Friend's ID" 
                                        control = {control}
                                        rules = {{
                                            required: "Friend's ID is required",
                                            minLength: {value: 8, message: "ID should be 8 characers long"},
                                        }}
                                    />
                                    <TouchableOpacity
                                        style={styles.menu_add_button}
                                        onPress= {handleSubmit(addPressed)}
                                    >
                                        <Text style = {{color: color.white, fontSize: temp_size * 1.5}}>Add</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style = {styles.nearby}>
                                <Text style = {styles.nearbyHeader}>nearby</Text>
                                <View style = {styles.nearbyBox}>
                                    <FlatList
                                        data={nearby}
                                        renderItem={({item}) => (
                                            <View style={styles.menu_box2} key={item.key}>
                                                <Image style={styles.menu_friend_profile} source = {{uri : item.image}} />

                                                <View style={styles.text}>
                                                    <Text style={styles.name}>
                                                        {item.name}
                                                    </Text>

                                                    <Text style={styles.code}>
                                                        {item.code}
                                                    </Text>
                                                </View>
                                            </View>
                                        )}
                                        extraData={loading}
                                        refreshing = {refresh}
                                        onRefresh = {() => {setRefresh(true); setLoading(true);}}
                                    />
                                </View>
                            </View>
                            <View style={styles.friendRequest}>
                                <Text style = {styles.nearbyHeader}>Friend Request</Text>
                                <View style={styles.nearbyBox}>
                                    <FlatList
                                        data={friendRequestlist}
                                        renderItem={({item}) => (
                                            <View style={styles.menu_box2} key={item.key}>
                                                <Image style={styles.menu_friend_profile} source = {{uri : item.image}} />

                                                <View style={styles.text}>
                                                    <Text style={styles.name}>
                                                        {item.name}
                                                    </Text>
                                                    <View style={styles.friendRequest_button_group}>
                                                    <TouchableOpacity
                                                        style={styles.menu_add_button}
                                                        onPress= {handleSubmit(addPressed)}
                                                    >
                                                        <Text style = {{color: color.white, fontSize: temp_size * 1.5}}>Add</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={styles.menu_add_button}
                                                        onPress= {handleSubmit(addPressed)}
                                                    >
                                                        <Text style = {{color: color.white, fontSize: temp_size * 1.5}}>Add</Text>
                                                    </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        )}
                                        extraData={loading}
                                        refreshing = {refresh}
                                        onRefresh = {() => {setRefresh(true); setLoading(true);}}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

                <View style = {styles.main_box_group}>
                    <View style = {styles.main_friend_box}>
                        <View style={styles.container2}>
                            <FlatList
                                data={items}
                                renderItem={({item}) => (
                                <View style={styles.box2} key={item.key}>
                                    <Image style={styles.main_friend_profile} source = {{ uri : item.image}} />
                                    <View style={styles.text}>
                                        <Text style={styles.name}>
                                            {item.name}
                                        </Text>
                                    </View>
                                </View>
                                )}
                                extraData={loading}
                                refreshing = {refresh}
                                onRefresh = {() => {setRefresh(true); setLoading(true);}}
                            />
                        </View>
                    </View>
                    <Image style = {styles.main_logo} source = {require('../../assets/logo.png')}/>
                </View>
            </SafeAreaView>
            {loading ? <AppLoader /> : null}
        </>
    ); 
}


export default FriendsPage;