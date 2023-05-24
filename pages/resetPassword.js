import React, { useState } from 'react';
import { Image, StyleSheet , View , SafeAreaView , Text, TouchableWithoutFeedback , Keyboard , Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import color from '../config/colors'

import CustomInput from '../components/customInput'
import CustomButton from '../components/customButton'
import BackButton from '../components/backButton';

const press = () => {
    Keyboard.dismiss();
}

function ResetPassword() {

    const [password, setPassword] = useState('');
    const [secondPassword, setsecondPassword] = useState('');

    const navigation = useNavigation();

    const back = () => {
        navigation.goBack();
    };

    const PressReset = () => {
        if (password.length > 5 && password == secondPassword) {
            Alert.alert(
                "Password changed successfully", "you can process to login with the new password.",
                [{ text: 'Ok' }],
                { cancelable: true }
            );
            console.log(
                "\nPassword Changed\nPassword: " + password 
                );
            navigation.goBack();
        } else {
            if (!(password.length > 5)) {
                Alert.alert(
                    "Please enter a valid Password", "Password must be at least be 6 Char long",
                    [{ text: 'Ok' }],
                    { cancelable: true }
                );
            } else {
                Alert.alert(
                    "Please enter the same Password", "",
                    [{ text: 'Ok' }],
                    { cancelable: true }
                );
            }
        }
        };

    return (
        <TouchableWithoutFeedback onPress={press}>
            <SafeAreaView style={styles.container}>
                <BackButton onPress={back}/>
                
                <Text style={styles.header}>
                    Enter new password
                </Text>

                <CustomInput placeholder="password" setValue={setPassword}/>
                <CustomInput placeholder="confirm password" setValue={setsecondPassword}/>

                <CustomButton text= "reset" onPress={PressReset}/>
            </SafeAreaView>
        </TouchableWithoutFeedback>
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
