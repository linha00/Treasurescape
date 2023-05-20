import React from 'react';
import { StyleSheet , View , TextInput } from 'react-native';

const CustomInput = ({ value , setValue , placeholder , secureTextEntry}) => {

    return (
        <View style={styles.container}>
            <TextInput
                value ={value}
                onChangeText={setValue}
                style={styles.input}
                placeholder= {placeholder}
                secureTextEntry = {secureTextEntry}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 50,
        width: "70%",
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        padding: 10,
    },

    input: {
        fontSize: 20,
    },

})

export default CustomInput;