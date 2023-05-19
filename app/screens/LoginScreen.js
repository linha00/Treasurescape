import React from 'react';
import { Image, StyleSheet , View , TextInput, SafeAreaView , Text, TouchableOpacity , Alert } from 'react-native';

function LoginScreen(props) {

    const [text, onChangeText] = React.useState('Useless Text');
    const [number, onChangeNumber] = React.useState('');

    return (
        <SafeAreaView style={styles.container}>
            
            <Image style={styles.logo} 
                source={require('../assets/logo.png')} />
            
            <View style={styles.keyable}>
            <TextInput
                style={styles.input}
                placeholder="Username"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
            />
            </View>

            <TouchableOpacity onPress={forgotPressed}> 
            <Text>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={loginPressed} style={styles.buttonContainer}> 
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

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

    keyable: {
        padding: 0,
        flex: 0,
        margin: 0,
    },

    input: {
        height: 40,
        width: 210,
        margin: 5,
        borderWidth: 1,
        padding: 10,
    },

    buttonContainer: {
        borderRadius: 15,
        paddingHorizontal: 35,
        paddingVertical: 10,
        backgroundColor: "#808080",
        margin: 3,
    },

    buttonText: {
        fontSize: 30,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },

    signupContainer: {
        flexDirection: "row"
    },

    signup: {
        color: "#FF0000",

    }
})

const loginPressed = () => console.log("Login button pressed");
const forgotPressed = () => console.log("Forgot Password button pressed");
const signupPressed = () => console.log("Forgot Password button pressed");

export default LoginScreen;