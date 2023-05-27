import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, Text, TouchableWithoutFeedback, Keyboard, Alert, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import color from '../config/colors';

import CustomInput from '../components/customInput';
import CustomButton from '../components/customButton';
import BackButton from '../components/backButton';

const press = () => {
    Keyboard.dismiss();
}

function ForgotPasswordPage() {
    const navigation = useNavigation();
    const {control, handleSubmit} = useForm();

    const pressedSubmit = (data) => {
        const {username} = data;
        try {
            // const response = await Auth.forgotPassword(username);
            console.log("\nVerification sent to\nUsername: " + username);
            Alert.alert("Verification code has been sent to your email", "");
            navigation.goBack();
            navigation.navigate('ResetPassword', {username});
        } catch(e) {
            Alert.alert('Oops', e.message);
        }
    };

    const back = () => {
        navigation.goBack();
    };

    return (
        <TouchableWithoutFeedback onPress = {press}>
            <SafeAreaView style = {styles.container}>
                <BackButton onPress = {back}/>

                <Text style = {styles.header}>
                    Forgot your Password?
                </Text>

                <Text style = {styles.text}>
                    Enter your Username below to reset your password        
                </Text>
                <View style = {{marginBottom: 5, width: "100%", alignItems: "center"}}>
                <CustomInput
                        name = "username"
                        placeholder = "Username"
                        control = {control}
                        rules = {{
                            required: "Username is required",
                            minLength: {value: 5, message: "Username should be minimum 5 characers long"},
                        }}
                    />
                </View>
                <CustomButton 
                    text= "Submit" 
                    onPress = {handleSubmit(pressedSubmit)}
                />
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
    
    header: {
        fontSize: 30,
        marginBottom: 10,
},

    text: {
        fontSize: 15,
        color: color.tertiary,
        marginBottom: 10,
},
})

export default ForgotPasswordPage;
