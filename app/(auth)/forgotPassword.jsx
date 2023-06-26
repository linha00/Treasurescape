import {StyleSheet, SafeAreaView, Text, TouchableWithoutFeedback, Keyboard, Alert, View, Image} from 'react-native';
import {useForm} from 'react-hook-form';
import color from '../../config/colors';

import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';
import BackButton from '../../components/backButton';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import PropTypes from 'prop-types';

//for font
import Icon from 'react-native-vector-icons/FontAwesome';

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
                <Image style={{width: 200, height: 200}}
                    source={require('../../assets/logo.png')} 
                />

                <BackButton onPress = {back}/>

                <Text style = {{fontSize: 20, fontStyle: 'italic', fontWeight: 'bold'}}>
                    Find your account
                </Text>

                <Text style={[styles.text, { marginTop: 10 }]}>
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
                    style = {{backgroundColor:"red"}}
                    text= "Find Account" 
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
    buttonText: {
        fontSize: 15,
        color: 'blue',
        fontWeight: 'bold',
},
})

export default ForgotPasswordPage;
