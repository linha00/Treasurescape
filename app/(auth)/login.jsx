import { useState } from 'react';
import { Image, StyleSheet, View, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabase';

import CustomButton from '../../components/customButton';
import CustomInput from '../../components/customInput';
import color from '../../config/colors';
import { useRouter } from 'expo-router';

export default function Login() {
    // eslint-disable-next-line no-unused-vars
    const {control, handleSubmit, formState: {errors}} = useForm();
    const navigation = useRouter();
    const [loading, setLoading] = useState(false);

    const press = () => Keyboard.dismiss();
    const forgotPressed = () => navigation.push('forgotPassword');
    const signupPressed = () => navigation.push('signup');
    
    const loginPressed = async data => {
        const {email, password} = data;

        console.log(
            "\nLogin attempt:" +
            "\nemail: " + email +
            "\nPassword: " + password
        );

        if (loading) {
            return;
        }
        setLoading(true);

        const {error} = await supabase.auth.signInWithPassword({email, password});
        if (error) {
            Alert.alert('Oops', error.message);
        } else {
            console.log(
                "\nLogin successful" +
                "\nemail: " + email 
            );
        }
        setLoading(false);
    };

    return (
        <TouchableWithoutFeedback onPress={press}>
            <SafeAreaView style={styles.container}>
                <Image style={styles.logo} 
                    source={require('../../assets/logo.png')} />
                
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
                    }}
                    secureTextEntry 
                />

                <TouchableOpacity onPress={forgotPressed}> 
                <Text>Forgot Password?</Text>
                </TouchableOpacity>

                <CustomButton 
                    text = {loading ? "Loading" : "Login"} 
                    onPress = {handleSubmit(loginPressed)}
                />

                <View style={styles.signupContainer}>
                    <Text>Do not have account? </Text>

                    <TouchableOpacity onPress={signupPressed}> 
                    <Text style={styles.signup}>Sign up</Text>
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