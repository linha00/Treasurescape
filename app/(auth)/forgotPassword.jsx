import {StyleSheet, SafeAreaView, Text, TouchableWithoutFeedback, Keyboard, Alert, View} from 'react-native';
import {useForm} from 'react-hook-form';
import color from '../../config/colors';

import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';
import BackButton from '../../components/backButton';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';

function ForgotPasswordPage() {
    const navigation = useRouter();
    const {control, handleSubmit} = useForm();
    
    const press = () => Keyboard.dismiss();
    const back = () => navigation.back();

    const pressedSubmit = async data => {
        const { email } = data;
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) {
            Alert.alert('Oops', error.message);
        } else {
            console.log("\nVerification sent to\nEmail: " + email);
            Alert.alert("Verification code has been sent to your email", "");
            navigation.back();
            navigation.push('resetPassword');
        }
    };

    return (
        <TouchableWithoutFeedback onPress = {press}>
            <SafeAreaView style = {styles.container}>
                <BackButton onPress = {back}/>

                <Text style = {styles.header}>
                    Forgot your Password?
                </Text>

                <Text style = {styles.text}>
                    Enter your Email below to reset your password        
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
                    onPress = {handleSubmit(pressedSubmit)}
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
