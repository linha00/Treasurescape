import React, { useState } from 'react';
import { Image, StyleSheet , View , SafeAreaView , Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import color from '../config/colors'

import CustomInput from '../components/customInput'
import CustomButton from '../components/customButton'
import BackButton from '../components/backButton';

function ResetPassword() {

    const [password, setPassword] = useState('');
    const [secondPassword, setsecondPassword] = useState('');

    const navigation = useNavigation();

    const back = () => {
        console.warn("back pressed");
        navigation.goBack();
    };

    const PressReset = () => {
        console.log(
            "\nPassword: " + password +
            "\nverification: " + (password == secondPassword)
            );
        console.warn("Password reseted");
        navigation.goBack();
        };

    return (
        <SafeAreaView style={styles.container}>
            <BackButton onPress={back}/>
            
            <Text style={styles.header}>
                Enter new password
            </Text>

            <CustomInput placeholder="password" setValue={setPassword}/>
            <CustomInput placeholder="confirm password" setValue={setsecondPassword}/>

            <CustomButton text= "reset" onPress={PressReset}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
    },

})

export default ResetPassword;
