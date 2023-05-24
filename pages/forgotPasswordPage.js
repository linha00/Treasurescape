import React, { useState } from 'react';
import { StyleSheet , SafeAreaView , Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import color from '../config/colors';

import CustomInput from '../components/customInput';
import CustomButton from '../components/customButton';
import BackButton from '../components/backButton';

function ForgotPasswordPage() {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');

    const pressedSendEmail = () => {
        console.warn("code sent to email");
        console.log("email: " + email);
        navigation.goBack();
        navigation.navigate('CodeVerification');
    };

    const back = () => {
        console.warn("back pressed");
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <BackButton onPress={back}/>

            <Text style={styles.header}>
                Forgot your Password?
            </Text>

            <Text style={styles.text}>
                Enter your email below to reset your password        
            </Text>
            <CustomInput placeholder= "Email" value={email} setValue={setEmail} />
            <CustomButton text= "Submit" onPress={pressedSendEmail}/>
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
    },
})

export default ForgotPasswordPage;
