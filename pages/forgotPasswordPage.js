import React, { useState } from 'react';
import { StyleSheet , SafeAreaView , Text , TouchableWithoutFeedback , Keyboard , Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import color from '../config/colors';

import CustomInput from '../components/customInput';
import CustomButton from '../components/customButton';
import BackButton from '../components/backButton';

const press = () => {
    Keyboard.dismiss();
}

function ForgotPasswordPage() {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');

    const pressedSendEmail = () => {
        if (email.length > 7 && email.indexOf("@") > 2 && email.includes(".com")) {
            Alert.alert(
                "Verification code has been sent to your email", "",
                [{ text: 'Ok' }],
                { cancelable: true }
            );
            console.log("\nVerification sent to\nemail: " + email);
            navigation.goBack();
            navigation.navigate('CodeVerification');
        } else {
            Alert.alert(
                "Please enter a valid Email", "",
                [{ text: 'Ok' }],
                { cancelable: true }
            );
        }
    };

    const back = () => {
        navigation.goBack();
    };

    return (
        <TouchableWithoutFeedback onPress={press}>
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
    },
})

export default ForgotPasswordPage;
