import {StyleSheet, SafeAreaView, Text, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import {useForm} from 'react-hook-form';

import CustomInput from '../../components/customInput'
import CustomButton from '../../components/customButton'
import BackButton from '../../components/backButton';
import { useRouter } from 'expo-router';

const press = () => {
    Keyboard.dismiss();
}

function ResetPassword() {
    const navigation = useRouter();
    // eslint-disable-next-line no-unused-vars
    const {control, handleSubmit, watch, formState: {errors}} = useForm();
    const pwd = watch("password");

    const back = () => navigation.back();

    const PressReset = async data => {
        try {
            // const response = await Auth.forgotPasswordSubmit(username, data.code, data.password);
            Alert.alert("Password changed successfully", "you can process to login with the new password.");
            console.log(
                "\nPassword Changed\nPassword: " + data.password 
            );
            navigation.back();
        } catch(e) {
            Alert.alert('Oops', e.message);
        }
 
    };

    return (
        <TouchableWithoutFeedback onPress = {press}>
            <SafeAreaView style = {styles.container}>
                <BackButton onPress = {back}/>
                
                <Text style = {styles.header}>
                    Reset Your Password
                </Text>
                <CustomInput
                    name = "code"
                    placeholder = "Verification Code"
                    control = {control}
                    rules = {{
                        required: "Code is required",
                        minLength: {value: 4, message: "The code is 6 characers long"},
                    }}
                />
                <CustomInput
                    name = "password"
                    placeholder = "Password"
                    control = {control}
                    rules = {{
                        required: "Password is required",
                        minLength: {value: 5, message: "Password should be minimum 6 characers long"},
                    }}
                />
                <CustomInput
                    name = "repeatPassword"
                    placeholder = "Repeat Password"
                    control = {control}
                    rules = {{
                        required: "Password is required",
                        minLength: {value: 5, message: "Password should be minimum 6 characers long"},
                        validate: value => value == pwd || "Password do not match"
                    }}
                />

                <CustomButton 
                    text= "reset" 
                    onPress = {handleSubmit(PressReset)}
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
        fontSize: 20,
        marginBottom: 10,
},

})

export default ResetPassword;
