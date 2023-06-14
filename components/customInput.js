import {StyleSheet, View, TextInput, Text} from 'react-native';
import {Controller} from 'react-hook-form';
import color from '../config/colors.js';

const CustomInput = ({rules = {}, control, name, placeholder, secureTextEntry, version = "Primary", maxLength = 28}) => {
    return (
        <Controller
            control = {control}
            name = {name}
            rules = {rules}
            render = {({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                <View style = {[styles.container, styles[`container_${version}`]]}>
                    <View style={[styles.box, styles[`box_${version}`], {borderColor: error ? color.red : color.white}]}>
                        <TextInput
                            value = {value}
                            onChangeText = {onChange}
                            onBlur = {onBlur}
                            style = {[styles.input , styles[`input_${version}`]]}
                            maxLength = {maxLength}
                            placeholder = {placeholder}
                            secureTextEntry = {secureTextEntry}
                        />
                    </View>
                    {error && (
                        <Text style = {styles.errortext}>{error.message || "Error"}</Text>
                    )}
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    
    container_Primary: {
        width: "70%",
    },

    container_code: {
        width: 40,
    },

    box: {
        backgroundColor: color.white,
        width: "100%",
        borderWidth: 1,
        borderRadius: 5,
    },
    
    box_Primary: {
        height: 50,
        margin: 5,
        padding: 10,
    },

    box_code: {
        height: 40,
        margin: 5,
        marginBottom: 10,
    },

    input: {
        fontSize: 20,
    },

    input_code: {
        fontSize: 30,
        textAlign: 'center',
    },

    errortext: {
        color: color.red,
        alignSelf: "stretch",
        left: 5,
    },
})

export default CustomInput;