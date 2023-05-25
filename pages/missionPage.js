import React, { useState } from 'react';
import { Image, StyleSheet , View , SafeAreaView , Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import color from '../config/colors'

import BackButton from '../components/backButton';
import CustomButton from '../components/customButton';
import TaskBar from '../components/taskBar';

function MissionPage() {
    const navigation = useNavigation();
    
    const press = () => {
        navigation.goBack();
        navigation.navigate('Home');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container1}>
                <BackButton onPress={press}/>
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
        top: 101,
        left: 101,
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