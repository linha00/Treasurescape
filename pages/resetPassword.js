import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, Text, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';
import {useForm} from 'react-hook-form';
import color from '../config/colors'

import CustomInput from '../components/customInput'
import CustomButton from '../components/customButton'
import BackButton from '../components/backButton';

const press = () => {
    Keyboard.dismiss();
}

function ResetPassword() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const {control, handleSubmit, watch, formState: {errors}} = useForm();

    const pwd = watch("password");

    const back = () => {
        navigation.goBack();
    };

    const PressReset = async data => {
        Alert.alert(
            "Password changed successfully", "you can process to login with the new password.",
            [{text: 'Ok'}],
            {cancelable: true}
        );
        console.log(
            "\nPassword Changed\nPassword: " + data.password 
            );
        navigation.goBack();
 
    };

    return (
        <TouchableWithoutFeedback onPress = {press}>
            <SafeAreaView style = {styles.container}>
                <BackButton onPress = {back}/>
                
                <Text style = {styles.header}>
                    Enter new password
                </Text>
                <CustomInput
                    name = "password"
                    placeholder = "Password"
                    control = {control}
                    rules = {{
                        required: "Password is required",
                        minLength: {value: 5, message: "Password should be minimum 6 characers long"},
                    }}
                />
                <CustomInput
                    name = "repeatPassword"
                    placeholder = "Repeat Password"
                    control = {control}
                    rules = {{
                        required: "Password is required",
                        minLength: {value: 5, message: "Password should be minimum 6 characers long"},
                        validate: value => value == pwd || "Password do not match"
                    }}
                />

                <CustomButton 
                    text= "reset" 
                    onPress = {handleSubmit(PressReset)}
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
        fontSize: 20,
        marginBottom: 10,
},

})

export default ResetPassword;
