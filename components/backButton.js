import React from 'react';
import { StyleSheet , TouchableOpacity , Text , Image} from 'react-native';
import color from '../config/colors'

const BackButton = ({onPress}) => {

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image style={styles.angle} source={require('../assets/leftAngleBracket.png')}/>
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

    angle: {
        width: 18,
        height: 18,
        marginTop: 2,
        marginRight: 2,
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