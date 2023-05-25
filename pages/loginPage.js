import React, {useState} from 'react';
import {Image, StyleSheet, View, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';
import {useForm} from 'react-hook-form';
import color from '../config/colors'

import CustomInput from '../components/customInput';
import CustomButton from '../components/customButton';

    const press = () => {
        Keyboard.dismiss();
    };

function LoginScreen() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const {control, handleSubmit, formState: {errors}} = useForm();

    //handles the verification of users and transition to the homepage
    const loginPressed = async (data) => {
        const {username, password} = data;

        console.log(
            "\nLogin attempt:" +
            "\nusername: " + username +
            "\nPassword: " + password
        );

        if (loading) {
            return;
        }

        setLoading(true);
        try {
            const response = await Auth.signIn(username, password);
            console.log(
                "\nLogin successful" +
                "\nusername: " + username 
            );
            navigation.navigate('Home', {username});
        } catch(e) {
            Alert.alert('Oops', e.message);
        }

        setLoading(false);
    };

    const forgotPressed = () => {
        navigation.navigate('ForgotPassword');
    };

    const signupPressed = () => {
        navigation.navigate('Signup');
    };
    
    return (
        <TouchableWithoutFeedback onPress = {press}>
            <SafeAreaView style = {styles.container}>
                <Image style = {styles.logo} 
                    source = {require('../assets/logo.png')} />

                <CustomInput 
                    name = "username"
                    placeholder = "Username" 
                    control = {control}
                    rules = {{
                        required: "Username is required",
                    }}
                />
                <CustomInput 
                    name = "password"
                    placeholder = "Password" 
                    control = {control}
                    rules = {{
                        required: "Password is required",
                    }}
                    secureTextEntry 
                />

                <TouchableOpacity onPress = {forgotPressed}> 
                    <Text>Forgot Password?</Text>
                </TouchableOpacity>

                <CustomButton 
                    text = {loading ? "Loading" : "Login"} 
                    onPress = {handleSubmit(loginPressed)}
                />

                <View style = {styles.signupContainer}>
                    <Text>Don't have account?</Text>
                    <TouchableOpacity onPress = {signupPressed}> 
                        <Text style = {styles.signup}>Sign up</Text>
                    </TouchableOpacity>
                </View>
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

    logo: {
        width: 300,
        height: 300,
        margin:-10,
    },

    signupContainer: {
        flexDirection: "row"
    },

    signup: {
        color: color.red,

    }
})

export default LoginScreen;
