/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {StyleSheet, SafeAreaView, View, Image, Dimensions, FlatList, Text, Modal } from 'react-native';
import { Tabs } from "expo-router"
import { useForm } from 'react-hook-form';
import { useFocusEffect } from '@react-navigation/native';
import color from '../../config/colors';

import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/auth';

import AppLoader from '../../components/AppLoader';
import CustomButton from '../../components/customButton';
import CustomInput from '../../components/customInput';

const windowWidth = Dimensions.get('window').width;
const logo = Dimensions.get('window').width / 16;
const componentWidth = (windowWidth / 3) - 30;
const componentHeight = componentWidth * 1.5;

function LogoTitle() {
    return (
      <Image
        style={{ width: logo, height: logo}}
        source={require("../../assets/friends.png")}
      />
    );
}

function FriendsPage() {
    const { user } = useAuth();
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [friend_id, setFriend_id] = useState('placeholder');
    const [items, setItems] = useState([{name: 'temp', image:"placeholder", online: true, key: '1'},]);
    const [modalVisible, setModalVisible] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const {control, handleSubmit, formState: {errors}} = useForm();
    const [addLoading, setAddLoading] = useState(false);

    async function getItems() {
        setLoading(true);
        let {data} = await supabase.from('profiles').select().eq('id', user.id).single();
        setFriend_id(data.friend_id);
        let templist = data.friends;
        let out = [];
        if (templist != null) {
            for (var i = 0; i < templist.length; i++) {
                let {data} = await supabase.from('profiles').select().eq('friend_id', templist[i]).single();
                let temp = out;
                out = temp.concat([{name: data.name, image: data.imageUrl, online: data.online, key: i}]);
            }
        }
        setItems(out);
        setLoading(false);
        setRefresh(false);
    }

    useFocusEffect(
        React.useCallback(() => {
            getItems();
        }, [])
    );

    useEffect(() => {
        if (refresh) {
            getItems();
        }
    }, [refresh])

    const addPressed = async data => {
        const {id} = data;

        console.log(
            "\nAdd friend attempt:" +
            "\nID: " + id
        );

        if (addLoading) {
            return;
        }
        setAddLoading(true);

        // const {error} = await supabase.auth.signInWithPassword({email, password});
        // if (error) {
        //     Alert.alert('Oops', error.message);
        // } else {
        //     console.log(
        //         "\nLogin successful" +
        //         "\nemail: " + email 
        //     );
        // }
        setAddLoading(false);
    };

    return (
        <>
            <Tabs.Screen 
                options={{
                    tabBarIcon: () => <LogoTitle />
                }}
            />
            <SafeAreaView style={styles.container}>
                <CustomButton type='addFriend' onPress={() => setModalVisible(true)}/>
                <Modal
                    animationType = {'fade'}
                    transparent = {true}
                    visible = {modalVisible}
                >
                    <View style = {styles.menuContainer}>
                        <View style = {styles.menu}>
                            <View style = {styles.top}>
                                <Text style = {styles.header}>Add Friend</Text>
                                <CustomButton 
                                    style = {styles.cross} 
                                    type='cross' 
                                    onPress={() => setModalVisible(false)}
                                />
                            </View>
                            <View style = {styles.id}>
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
                                    <CustomButton
                                        text = {addLoading ? "Loading" : "Add"} 
                                        onPress = {handleSubmit(addPressed)}
                                    />
                                </View>
                            </View>
                            <View style = {styles.nearby}>
                                <Text style = {styles.nearbyHeader}>nearby</Text>
                                <View style = {styles.nearbyBox}>
                                    <Text>placeholder</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style = {styles.group}>
                    <View style = {styles.box}>
                    <View style={styles.container2}>
                        <FlatList
                            data={items}
                            renderItem={({item}) => (
                            <View style={styles.box2} key={item.key}>
                                <Image style={styles.image2} source = {{ uri : item.image}} />
                                <View style={styles.text}>
                                    <Text style={styles.name}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.desc}>
                                        {item.online}
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
                    <Image style = {styles.image} source = {require('../../assets/logo.png')}/>
                </View>
            </SafeAreaView>
            {loading ? <AppLoader /> : null}
        </>
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },

    box: {
        width: windowWidth * 0.8,
        height: '75%',
        padding: 5,
        borderWidth: 1,
        borderRadius: 25,
    },

    image: {
        width: 170,
        height: 170,
        top: -10,
    },

    group: {
        alignItems: 'center',
        justifyContent: 'center',
        top: 50,
    },

    container2: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    box2: {
        flexDirection: 'row',
        width: "100%",
        height: componentHeight + 20,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        paddingBottom: 5,
        marginBottom: 10,
        borderBottomWidth: 1,
    },

    image2: {
        width: componentWidth,
        height: componentHeight,
        left: 0,
    },

    text: {
        width: componentWidth + 30,
        top: 15,
        left: 20,
    },

    name: {
        fontSize: 14,
        fontWeight: 'bold',
    },

    price: {
        fontSize: 12,
        color: color.gold,
    },

    desc: {
        fontSize: 11,
    },

    menuContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#000000aa",
    },

    menu: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 20,
        width: '90%',
        height: '80%',
        padding: 20,
        backgroundColor: color.primary,
    },

    top: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    header: {
        flex: 1,
        fontSize: 25,
        left: 135,
    },

    id: {
        flex: 2,
        width: '85%',
    },

    ownID: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    addID: {
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    
    nearby: {
        flex: 9,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: -15,
    },

    nearbyHeader: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingBottom: 5,
    },

    nearbyBox: {
        width: '100%',
        height: '90%',
        margin: 2,
        backgroundColor: color.gold,
    },
    
})

export default FriendsPage;