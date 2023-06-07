import {StyleSheet, SafeAreaView, Text, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import {useForm} from 'react-hook-form';

import CustomInput from '../../components/customInput'
import CustomButton from '../../components/customButton'
import BackButton from '../../components/backButton';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';

const press = () => {
    Keyboard.dismiss();
}

function ResetPassword() {
    const navigation = useRouter();
    // eslint-disable-next-line no-unused-vars
    const {control, handleSubmit, watch, formState: {errors}} = useForm();
    const pwd = watch("password");

    const PressReset = async data => {
        const {email, password, code} = data;

        try {
            const { data, error } = await supabase.auth.updateUser(code, {
                email: email,
                password: password,
            });
            console.log(data);
            console.log(error);
            Alert.alert("Password changed successfully", "you can process to login with the new password.");
            console.log(
                "\nPassword Changed\nPassword: " + password 
            );
            navigation.back();
        } catch(error) {
            Alert.alert('Oops', error.message);
        }
 
    };

    return (
        <TouchableWithoutFeedback onPress = {press}>
            <SafeAreaView style = {styles.container}>
                <BackButton onPress = {() => navigation.back()}/>
                
                <Text style = {styles.header}>
                    Reset Your Password
                </Text>
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
