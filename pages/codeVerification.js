import React, { useState } from 'react';
import { StyleSheet , SafeAreaView , Text, View, TouchableOpacity , TouchableWithoutFeedback , Keyboard , Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import color from '../config/colors';

import CustomButton from '../components/customButton';
import BackButton from '../components/backButton';
import CustomInput from '../components/customInput';

const press = () => {
    Keyboard.dismiss();
}

function CodeVerification() {

    const navigation = useNavigation();

    const [code1, setcode1] = useState('');
    const [code2, setcode2] = useState('');
    const [code3, setcode3] = useState('');
    const [code4, setcode4] = useState('');
    const code = code1 + code2 + code3 + code4;

    const pressedSendEmail = () => {
        if (code == "1111"/*check for verification*/) {
            navigation.goBack();
            navigation.navigate('ResetPassword');
            console.log("\nverification successfully");
        } else {
            Alert.alert(
                "Wrong Verification Code", "Please enter the correct code that is sent to your email.",
                [{ text: 'Ok' }],
                { cancelable: true }
            );
        }
    };

    const back = () => {
        navigation.goBack();
    };

    const resend = () => {
        navigation.goBack();
        navigation.navigate('ForgotPassword');
    };

    return (
        <TouchableWithoutFeedback onPress={press}>
            <SafeAreaView style={styles.container}>
                <BackButton onPress={back}/>

                <Text style={styles.header}>
                    Verification
                </Text>

                <Text style={styles.text}>
                    please enter the verification code we sent to your email address
                </Text>
                <View style={styles.code}>
                    <CustomInput version='code' maxLength={1} setValue={setcode1}/>
                    <CustomInput version='code' maxLength={1} setValue={setcode2}/>
                    <CustomInput version='code' maxLength={1} setValue={setcode3}/>
                    <CustomInput version='code' maxLength={1} setValue={setcode4}/>
                </View>
                <CustomButton text= "Submit" onPress={pressedSendEmail}/>
                
                <View style={styles.goback}>
                    <Text style={styles.gobacktext}>Did not recieve the code? </Text>
                    
                    <TouchableOpacity onPress={resend}>
                        <Text style={styles.clickhere}>Click here</Text>
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
    
    header: {
        fontSize: 30,
        marginBottom: 10,
    },

    text: {
        fontSize: 15,
        color: color.tertiary,
        marginBottom: 10,
        width: '70%',
        textAlign: 'center',
    },

    code: {
        flexDirection: 'row',
    },

    goback: {
        flexDirection: 'row',
    },

    gobacktext: {
        fontSize: 15,
        color: color.tertiary,
    },

    clickhere: {
        fontSize: 15,
        color: color.red,
    },
})

export default CodeVerification;
