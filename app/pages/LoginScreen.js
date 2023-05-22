import React, { useState } from 'react';
import { Image, StyleSheet , View , SafeAreaView , Text, TouchableOpacity } from 'react-native';
import color from '../config/colors'

import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'

function LoginScreen(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginPressed = () => {
        console.warn("Login");
        console.log(
                "\nusername: " + username +
                "\nPassword: " + password
            );
    };

    const forgotPressed = () => console.warn("Forgot Password");
    const signupPressed = () => console.warn("Sign Up");

    return (
        <SafeAreaView style={styles.container}>
            
            <Image style={styles.logo} 
                source={require('../assets/logo.png')} />
            
            <CustomInput placeholder= "Username" value={username} setValue={setUsername} />
            <CustomInput placeholder= "Password" value={password} setValue={setPassword} secureTextEntry/>

            <TouchableOpacity onPress={forgotPressed}> 
            <Text>Forgot Password?</Text>
            </TouchableOpacity>

            <CustomButton text= "Login" onPress={loginPressed}/>

            <View style={styles.signupContainer}>
                <Text>Don't have account? </Text>

                <TouchableOpacity onPress={signupPressed}> 
                <Text style={styles.signup}>Sign up</Text>
                </TouchableOpacity>
            </View>
            
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