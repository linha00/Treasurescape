import React from 'react';
import {StyleSheet, SafeAreaView, View, Text, Image } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import color from '../config/colors';

import TaskBar from '../components/taskBar';
import SidePanelButton from '../components/sidePanelButton';
import ProfileButton from '../components/profileButton';
import Friends from '../components/friends';

function FriendsPage() {
    const navigation = useNavigation();

    const pressHandler = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style = {styles.top}>
                <SidePanelButton/>
                <ProfileButton />
                <View style = {styles.group}>
                    <View style = {styles.box}>
                        <Friends/>
                    </View>
                    <Image style = {styles.image} source = {require('../assets/logo.png')}/>
                </View>
            </View>

            <TaskBar style={styles.taskbar}/>
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    top: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    box: {
        width: '90%',
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
    
})

export default FriendsPage;