import React from 'react';
import { Image, StyleSheet , View , TextInput, SafeAreaView , Text, Button } from 'react-native';

function LoginScreen(props) {

    const [text, onChangeText] = React.useState('Useless Text');
    const [number, onChangeNumber] = React.useState('');

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} 
                source={require('../assets/logo.png')} />
            
            <TextInput
                style={styles.input}
                placeholder="Username"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
            />

            <Text>Forgot Password?</Text>

            <Button style={styles.button} 
                title='Login'
                onPress={() => console.log("Login button pressed")}
            />

            <View style={styles.signup}>
                <Text>Don't have account? </Text>
                <Text>Sign up</Text>
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
        width: 300,
        height: 300,
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

    signup: {
        flexDirection: "row"
    }
})

export default LoginScreen;