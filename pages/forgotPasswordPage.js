import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, Text, TouchableWithoutFeedback, Keyboard, Alert, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';
import {useForm} from 'react-hook-form';
import color from '../config/colors';

import CustomInput from '../components/customInput';
import CustomButton from '../components/customButton';
import BackButton from '../components/backButton';

const press = () => {
    Keyboard.dismiss();
}

function ForgotPasswordPage() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const {control, handleSubmit, formState: {errors}} = useForm();

    const pressedSendEmail = async data => {
        console.log("\nVerification sent to\nemail: " + data.email);
        
        Alert.alert(
            "Verification code has been sent to your email", "",
            [{text: 'Ok'}],
            {cancelable: true}
        );
        navigation.goBack();
        navigation.navigate('CodeVerification');
    };

    const back = () => {
        navigation.goBack();
    };

    return (
        <TouchableWithoutFeedback onPress = {press}>
            <SafeAreaView style = {styles.container}>
                <BackButton onPress = {back}/>

                <Text style = {styles.header}>
                    Forgot your Password?
                </Text>

                <Text style = {styles.text}>
                    Enter your email below to reset your password        
                </Text>
                <View style = {{marginBottom: 5, width: "100%", alignItems: "center"}}>
                    <CustomInput
                        name = "email"
                        placeholder = "Email"
                        control = {control}
                        rules = {{
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            },
                        }}
                    />
                </View>
                <CustomButton 
                    text= "Submit" 
                    onPress = {handleSubmit(pressedSendEmail)}
                />
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
