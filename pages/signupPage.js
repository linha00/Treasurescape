import React, {useState} from 'react';
import {Image, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import color from '../config/colors'

import CustomInput from '../components/customInput';
import CustomButton from '../components/customButton';
import BackButton from '../components/backButton';

    const press = () => {
        Keyboard.dismiss();
    }

function SignupPage() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const {control, handleSubmit, watch, formState: {errors}} = useForm();

    const pwd = watch("password");

    const signupPressed = async (data) => {
        const {username, password, email, name} = data;
        console.log(
            "\nSignup Attempt" +
            "\nName: " + data.name +
            "\nUsername: " + data.username +
            "\nEmail: " + data.email +
            "\nPassword: " + data.password 
        )
        
        if (loading) {
            return;
        }

        setLoading(true);
        try {
            // const response = await Auth.signUp({
            //     username,
            //     password, 
            //     attributes: {
            //         email, 
            //         name,
            //         preferred_username: username
            //     }
            // });
            console.log(
                "\nSignup successful" +
                "\nusername: " + data.username 
            );
            navigation.goBack();
            Alert.alert("Account Created", "");
        } catch(e) {
            Alert.alert('Oops', e.message);
        }

        setLoading(false);
    };

    const termsPressed = () => console.warn("terms");

    const loginPressed = () => {
        navigation.goBack();
    }
    
    return (
        <TouchableWithoutFeedback onPress = {press}>
            <SafeAreaView style = {styles.container}>
                <BackButton onPress = {() => navigation.goBack()}/>

                <Image style = {styles.logo} 
                    source = {require('../assets/logo.png')} />

                <View style = {styles.container1}>
                    <CustomInput
                        name = "name"
                        placeholder = "Name"
                        control = {control}
                        rules = {{
                            required: "Full Name is required",
                            minLength: {value: 3, message: "Name should be minimum 3 characers long"},
                        }}
                    />
                    <CustomInput
                        name = "username"
                        placeholder = "Username"
                        control = {control}
                        rules = {{
                            required: "Username is required",
                            minLength: {value: 5, message: "Username should be minimum 5 characers long"},
                        }}
                    />
                    <CustomInput
                        name = "email"
                        placeholder = "Email"
                        control = {control}
                        rules = {{
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            },
                        }}
                    />
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
                </View>
                
                <View style = {styles.lineContainer}>
                    <Text>By creating an account, you agree to our </Text>
                    
                    <TouchableOpacity onPress = {termsPressed}>
                        <Text style = {styles.terms}>Terms of Use</Text>
                    </TouchableOpacity>
                </View>

                <CustomButton 
                    text= {loading ? "Loading" : "Sign up"} 
                    onPress = {handleSubmit(signupPressed)}
                />

                <View style = {styles.lineContainer}>
                    <Text>Already have an account? </Text>
                    
                    <TouchableOpacity onPress = {loginPressed}>
                        <Text style = {styles.login}>Log In</Text>
                    </TouchableOpacity>
                </View>
                
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    logo: {
        width: 250,
        height: 250,
        margin: -30,
    },

    container1: {
        width: '95%',
        justifyContent: "center",
        alignItems: "center",
    },

    lineContainer: {
        flexDirection: "row",
    },

    terms: {
        color: color.blue,
    },

    login: {
        color: color.red,
    }

})

export default SignupPage;