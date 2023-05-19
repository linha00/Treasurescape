import React from 'react';
import { Image, StyleSheet , Text , View, SafeAreaView , TextInput , TouchableOpacity , Alert } from 'react-native';

function StartScreen(props) {
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} 
                source={require('../assets/logo.png')} />
            
            <TextInput
                style={styles.input}
                placeholder="Full name"
            />

            <TextInput
                style={styles.input}
                placeholder="Username"
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
            />

            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
            />

            <View style={styles.lineContainer}>
                <Text>By creating an account, you agree to our </Text>
                <TouchableOpacity onPress={termsPressed}>
                  <Text style={styles.terms}>terms</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={signupPressed} style={styles.buttonContainer}> 
                <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>

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

    input: {
        height: 40,
        width: 210,
        margin: 4,
        borderWidth: 1,
        padding: 10,
    },

    buttonContainer: {
        borderRadius: 15,
        paddingHorizontal: 35,
        paddingVertical: 10,
        backgroundColor: "#808080",
        marginTop: 4,
        marginBottom: 6, 
    },

    buttonText: {
        fontSize: 30,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },

    lineContainer: {
        flexDirection: 'row',
    },

    terms: {
        color: '#0000FF',
    },

    login: {
        color: '#FF0000',
    }

})

const signupPressed = () => console.log("Sign up button pressed");
const termsPressed = () => console.log("terms button pressed");
const loginPressed = () => console.log("login button pressed");


export default StartScreen;