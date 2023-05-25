import React, { useState } from 'react';
import { Image, StyleSheet , View , SafeAreaView , Text, TouchableOpacity , TouchableWithoutFeedback , Keyboard , Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import color from '../config/colors'

import CustomInput from '../components/customInput'
import CustomButton from '../components/customButton'

    const press = () => {
        Keyboard.dismiss();
    };

function LoginScreen() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const loginPressed = async(data) => {
        const response = await Auth.signIn(data.username, data.password);
        if (username == "admin" && password == "password" /*database verification*/) {
            console.log(
                "\nLogin successful" +
                "\nusername: " + username +
                "\nPassword: " + password
                );
            navigation.navigate('Home');
        } else {
            Alert.alert(
                "Incorrect username or password", "",
                [{ text: 'Ok' }],
                { cancelable: true }
            );
        }
        };

    const forgotPressed = () => {
        navigation.navigate('ForgotPassword');
    };

    const signupPressed = () => {
        navigation.navigate('Signup');
    };
    
    return (
        <TouchableWithoutFeedback onPress={press}>
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
