/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {StyleSheet, SafeAreaView, View, Image, Dimensions, FlatList, Text } from 'react-native';
import { Tabs } from "expo-router"
import color from '../../config/colors';

import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/auth';

import AppLoader from '../../components/AppLoader';
import CustomButton from '../../components/customButton';
import { AddFriendMenu } from '../../components/addFriendMenu';

const windowWidth = Dimensions.get('window').width;
const componentWidth = (windowWidth / 3) - 30;
const componentHeight = componentWidth * 1.5;

function LogoTitle() {
    return (
      <Image
        style={{ width: 30, height: 30, top: 2}}
        source={require("../../assets/friends.png")}
      />
    );
}

function FriendsPage() {
    const { user } = useAuth();
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([{name: 'temp', image:"placeholder", online: true, key: '1'},]);

    let popupRef = React.createRef();

    const onShowPopup = () => popupRef.show();
    const onClosePopup = () => popupRef.close(); 

    async function getItems() {
        setLoading(true);
        let {data} = await supabase.from('profiles').select().eq('id', user.id).single();
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

    useEffect(() => {
        getItems();
    }, [])

    useEffect(() => {
        if (refresh) {
            getItems();
        }
    }, [refresh])

    return (
        <>
            <Tabs.Screen 
                options={{
                    tabBarIcon: () => <LogoTitle />
                }}
            />
            <SafeAreaView style={styles.container}>
                <CustomButton type='addFriend' onPress={onShowPopup}/>
                <AddFriendMenu  
                        ref= {(target) => popupRef = target}
                        onTouchOutside = {onClosePopup}
                    />
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
    
})

export default FriendsPage;