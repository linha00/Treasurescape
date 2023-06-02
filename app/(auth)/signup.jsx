import { useState } from 'react';
import { Image, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import { useForm } from 'react-hook-form';
import color from '../../config/colors'

import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';
import BackButton from '../../components/backButton';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';


function SignupPage() {
    const navigation = useRouter();
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const {control, handleSubmit, watch, formState: {errors}} = useForm();
    const pwd = watch("password");
    
    const press = () => Keyboard.dismiss();
    const termsPressed = console.warn("terms");
    const loginPressed = () => navigation.backs();
    
    const signupPressed = async (data) => {
        const {password, email, name} = data;
        console.log(
            "\nSignup Attempt" +
            "\nName: " + name +
            "\nEmail: " + email +
            "\nPassword: " + password 
        )
        if (loading) {
            return;
        }
        
        setLoading(true);
        const {error} = await supabase.auth.signUp(
            {
                email, 
                password,
                options: {
                    data: {
                        name: name,
                    }
                }
            }
        );
        if (error) {
            Alert.alert('Oops', error.message);
        } else {
            Alert.alert("Account Created", "");
            console.log(
                "\nSignup successful" +
                "\nemail: " + email 
            );
        }
        setLoading(false);
    };
    
    return (
        <TouchableWithoutFeedback onPress = {press}>
            <SafeAreaView style = {styles.container}>
                <BackButton onPress={loginPressed}/>
                <Image style = {styles.logo} 
                    source = {require('../../assets/logo.png')} />
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