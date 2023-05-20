import React from 'react';
import { StyleSheet , TouchableOpacity , Text } from 'react-native';

const CustomButton = ({text , onPress}) => {

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}> 
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        paddingHorizontal: 35,
        paddingVertical: 10,
        backgroundColor: "#808080",
        margin: 3,
        alignContent: "center",
    },

    text: {
        fontSize: 30,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },

})

export default CustomButton;