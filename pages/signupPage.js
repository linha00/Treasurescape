import React, { useState } from 'react';
import { Image, StyleSheet , Text , View, SafeAreaView , TouchableOpacity , TouchableWithoutFeedback , Keyboard , Alert} from 'react-native';
import color from '../config/colors'

import CustomInput from '../components/customInput';
import CustomButton from '../components/customButton';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/backButton';

const press = () => {
    Keyboard.dismiss();
}

function StartScreen() {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');

    const navigation = useNavigation();

    const signupPressed = () => {
        if (
            name.length > 2 &&
            username.length > 5 &&
            email.length > 7 && email.indexOf("@") > 2 && email.includes(".com") &&
            password.length > 5 && password == secondPassword
            ) {
                console.warn("Sign up");
                console.log(
                    "\nFull name: " + name +
                    "\nUsername: " + username +
                    "\nemail: " + email +
                    "\npassword: " + password 
                )
                navigation.goBack();
        } else {
            if (!(name.length > 2)) {
                Alert.alert(
                    "Please enter a valid name", "Name must be at least be 3 Char long",
                    [{ text: 'Ok' }],
                    { cancelable: true }
                );
            } else if (!(username.length > 5)) {
                Alert.alert(
                    "Please enter a valid Username", "Username must be at least be 6 Char long",
                    [{ text: 'Ok' }],
                    { cancelable: true }
                );
            } else if (!(email.length > 7 && email.indexOf("@") > 2 && email.includes(".com"))) {
                Alert.alert(
                    "Please enter a valid Email", "",
                    [{ text: 'Ok' }],
                    { cancelable: true }
                );
            } else if (!(password.length > 5)) {
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
        };

        //the signup process
    };

    const termsPressed = () => console.warn("terms");

    const loginPressed = () => {
        navigation.goBack();
    }
    
    return (
        <TouchableWithoutFeedback onPress={press}>
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
        </TouchableWithoutFeedback>
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