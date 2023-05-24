import React, { useState } from 'react';
import { Image, StyleSheet , Text , View, SafeAreaView , TextInput , TouchableOpacity , Alert } from 'react-native';
import color from '../config/colors'

import CustomInput from '../components/customInput';
import CustomButton from '../components/customButton';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/backButton';

function StartScreen() {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    const passwordConfirmation = password == secondPassword;

    const navigation = useNavigation();

    const signupPressed = () => {
        console.warn("Sign up");
        console.log(
            "\nFull name: " + name +
            "\nUsername: " + username +
            "\nemail: " + email +
            "\npassword: " + password +
            "\nConfirmation: " + passwordConfirmation
        )
        navigation.goBack();

        //the signup process
    };

    const termsPressed = () => console.warn("terms");
    const loginPressed = () => {
        console.warn("login");
        navigation.goBack();
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <BackButton onPress={() => navigation.goBack()}/>

            <Image style={styles.logo} 
                source={require('../assets/logo.png')} />

            <View style={styles.container1}>
                <CustomInput placeholder= "Full name" value={name} setValue={setName}/>
                <CustomInput placeholder= "Username" value={username} setValue={setUsername}/>
                <CustomInput placeholder= "Email" value={email} setValue={setEmail}/>
                <CustomInput placeholder= "Password" value={password} setValue={setPassword}/>
                <CustomInput placeholder= "Confirm Password" value={secondPassword} setValue={setSecondPassword}/>
            </View>
            
            <View style={styles.lineContainer}>
                <Text>By creating an account, you agree to our </Text>
                <TouchableOpacity onPress={termsPressed}>
                  <Text style={styles.terms}>Terms of Use</Text>
                </TouchableOpacity>
            </View>

            <CustomButton text= "Sign up" onPress={signupPressed}/>

            <View style={styles.lineContainer}>
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={loginPressed}>
                    <Text style={styles.login}>Log In</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        width: 250,
        height: 250,
        margin: -30,
    },

    container1: {
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    lineContainer: {
        flexDirection: 'row',
    },

    terms: {
        color: color.blue,
    },

    login: {
        color: color.red,
    }

})

export default StartScreen;