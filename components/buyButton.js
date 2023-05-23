import React from 'react';
import { StyleSheet , TouchableOpacity , Text } from 'react-native';
import color from '../config/colors'

const BuyButton = ({text , onPress}) => {

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}> 
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: color.lightBlue,
        margin: 3,
        alignContent: "center",
    },

    text: {
        fontSize: 20,
        color: color.black,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },

})

export default BuyButton;