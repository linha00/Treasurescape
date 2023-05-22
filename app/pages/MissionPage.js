import React, { useState } from 'react';
import { Image, StyleSheet , View , SafeAreaView , Text, TouchableOpacity } from 'react-native';
import color from '../config/colors'

import BackButton from '../components/BackButton';
import CustomButton from '../components/CustomButton';
import TaskBar from '../components/TaskBar';

function MissionPage(props) {



    return (
        <SafeAreaView style={styles.container}>
            <BackButton style={styles.back}/>
            <View style={styles.container1}>
                <Image style={styles.logo} 
                    source={require('../assets/logo.png')} />
            </View>

            <View style={styles.container2}>
                <Text style={styles.header}>
                    Mission 1:
                </Text>
                
                <View style={styles.box}>
                    <Text>asdadzxcdcqwecq</Text>
                </View>
            </View>

            <View style={styles.button}>
                <CustomButton text= "Embak"/>
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

    container1: {
        flex: 2,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },  

    container2: {
        flex: 2.5,
        width: '90%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 10,
    }, 

    button: {
        flex: 0.8,
        top: -50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        width: 250,
        height: 250,
    },

    back: {
        position: 'absolute',
        top: 10,
        left: 10,
    },

    header: {
        fontSize: 25,
    },

    box: {
        backgroundColor: color.primary,
        width: '100%',
        height: '80%',
        paddingTop: 25,
        paddingHorizontal: 30,
        borderRadius: 30,
    },

})

export default MissionPage;