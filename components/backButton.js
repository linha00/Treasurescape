import React from 'react';
import { StyleSheet , TouchableOpacity , Text } from 'react-native';
import color from '../config/colors'

const BackButton = ({onPress}) => {

    return (
        <TouchableOpacity style={styles.container}>
            <Text>
                image
            </Text>
            <Text style={styles.text}>
                Back
            </Text>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        left: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        fontSize: 20,
        color: color.tertiary,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },

})

export default BackButton;