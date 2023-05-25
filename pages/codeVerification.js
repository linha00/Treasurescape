import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';
import {useForm} from 'react-hook-form';
import color from '../config/colors';

import CustomButton from '../components/customButton';
import BackButton from '../components/backButton';
import CustomInput from '../components/customInput';

const press = () => {
    Keyboard.dismiss();
}

function CodeVerification() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const {control, handleSubmit, formState: {errors}} = useForm();

    const pressedSubmit = async data => {
        let code = data.code1 + data.code2 + data.code3 + data.code4; 
        console.log(code);
        if (code == "1111"/*check for verification*/) {
            navigation.goBack();
            navigation.navigate('ResetPassword');
            console.log("\nverification successfully");
        } else {
            Alert.alert(
                "Wrong Verification Code", "Please enter the correct code that is sent to your email.",
                [{text: 'Ok'}],
                {cancelable: true}
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
        <TouchableWithoutFeedback onPress = {press}>
            <SafeAreaView style = {styles.container}>
                <BackButton onPress = {back}/>

                <Text style = {styles.header}>
                    Verification
                </Text>

                <Text style = {styles.text}>
                    please enter the verification code we sent to your email address
                </Text>
                <View style = {styles.code}>
                    <CustomInput
                        name = "code1"
                        control = {control}
                        version = "code"
                        maxLength = {1}
                    />
                    <CustomInput
                        name = "code2"
                        control = {control}
                        version = "code"
                        maxLength = {1}
                    />
                    <CustomInput
                        name = "code3"
                        control = {control}
                        version = "code"
                        maxLength = {1}
                    />
                    <CustomInput
                        name = "code4"
                        control = {control}
                        version = "code"
                        maxLength = {1}
                    />

                </View>

                <CustomButton 
                    text = "Submit" 
                    onPress = {handleSubmit(pressedSubmit)}
                />
                
                <View style = {styles.goback}>
                    <Text style = {styles.gobacktext}>Did not recieve the code? </Text>
                    
                    <TouchableOpacity onPress = {resend}>
                        <Text style = {styles.clickhere}>Click here</Text>
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
        justifyContent: 'space-between', 
        width: '40%',
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
