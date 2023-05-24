import React, { useState } from 'react';
import { StyleSheet , SafeAreaView , Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import color from '../config/colors';

import CustomButton from '../components/customButton';
import BackButton from '../components/backButton';
import CustomInput from '../components/customInput';

function CodeVerification() {

    const navigation = useNavigation();

    const [code1, setcode1] = useState('');
    const [code2, setcode2] = useState('');
    const [code3, setcode3] = useState('');
    const [code4, setcode4] = useState('');

    const pressedSendEmail = () => {
        console.warn("code entered");
        console.log("code: " + code1 + code2 + code3 + code4);
        navigation.goBack();
        navigation.navigate('ResetPassword');
    };

    const back = () => {
        console.warn("back pressed");
        navigation.goBack();
    };

    const resend = () => {
        console.warn("redo email");
        navigation.goBack();
        navigation.navigate('ForgotPassword');
    };

    return (
        <SafeAreaView style={styles.container}>
            <BackButton onPress={back}/>

            <Text style={styles.header}>
                Verification
            </Text>

            <Text style={styles.text}>
                please enter the verification code we sent to your email address
            </Text>
            <View style={styles.code}>
                <CustomInput type='code' maxLength={1} setValue={setcode1}/>
                <CustomInput type='code' maxLength={1} setValue={setcode2}/>
                <CustomInput type='code' maxLength={1} setValue={setcode3}/>
                <CustomInput type='code' maxLength={1} setValue={setcode4}/>
            </View>
            <CustomButton text= "Submit" onPress={pressedSendEmail}/>
            
            <View style={styles.goback}>
                <Text style={styles.gobacktext}>Did not recieve the code? </Text>
                
                <TouchableOpacity onPress={resend}>
                    <Text style={styles.clickhere}>Click here</Text>
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
