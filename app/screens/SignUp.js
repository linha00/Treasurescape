import React from 'react';
import { Image, StyleSheet , Text , View, SafeAreaView , TextInput , Button } from 'react-native';

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

            <View style={styles.signup}>
                <Text>By creating an account, you agree to our </Text>
                <Text>terms</Text>
            </View>

            <Button style={styles.button} 
                title='Sign Up'
                onPress={() => console.log("Login button pressed")}
            />

            <View style={styles.signup}>
                <Text>Already have an account? </Text>
                <Text>Log In</Text>
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
        width: 200,
        height: 200,
    },

    input: {
        height: 40,
        width: 210,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },

    button: {
        borderRadius: 8,
        padding: 20,
        backgroundColor: '#f01d71',
    },

})

export default StartScreen;