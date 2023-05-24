import React from 'react';
import { StyleSheet , View , TextInput } from 'react-native';

const CustomInput = ({ value , setValue , placeholder , secureTextEntry, type = "Primary" , maxLength = 100}) => {


    return (
        <View style={[styles.container, styles[`container_${type}`]]}>
            <TextInput
                value ={value}
                onChangeText={setValue}
                style={[styles.input , styles[`input_${type}`]]}
                maxLength={maxLength}
                placeholder= {placeholder}
                secureTextEntry = {secureTextEntry}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
    },
    
    container_Primary: {
        height: 50,
        width: "70%",
        margin: 5,
        padding: 10,
    },

    container_code: {
        width: 30,
        height: 30,
        margin: 5,
        marginBottom: 10,
    },

    input: {
        fontSize: 20,
    },

    input_code: {
        textAlign: 'center',
    },
})

export default CustomInput;