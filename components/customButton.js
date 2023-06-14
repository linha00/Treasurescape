import { StyleSheet , TouchableOpacity , Text, Image } from 'react-native';
import color from '../config/colors'

const CustomButton = ({type = "input", text , onPress}) => {
    if (type == "addFriend") {
        return (
            <TouchableOpacity onPress={onPress} style={styles.container_topright}> 
                <Image style={styles.image_topright} source={require('../assets/addFriend.png')}/>
            </TouchableOpacity>
        );
    } else if (type == "profile") {
        return (
            <TouchableOpacity onPress={onPress} style={styles.container_topright}> 
                <Image style={styles.image_topright} source={require('../assets/profile.png')}/>
            </TouchableOpacity>
        );
    } else if (type == "cross") {
        return (
            <TouchableOpacity onPress={onPress} style={styles.container_cross}> 
                <Image style={styles.image_cross} source={require('../assets/cross.png')}/>
            </TouchableOpacity>
        );
    } else {
        return (
            <TouchableOpacity onPress={onPress} style={styles[`container_${type}`]}> 
                <Text style={styles[`text_${type}`]}>{text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container_input: {
        borderRadius: 15,
        paddingHorizontal: 35,
        paddingVertical: 10,
        backgroundColor: color.tertiary,
        margin: 3,
        alignContent: "center",
    },

    text_input: {
        fontSize: 30,
        color: color.white,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },

    container_buy: {
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: color.lightBlue,
        margin: 3,
        alignContent: "center",
    },

    text_buy: {
        fontSize: 20,
        color: color.black,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },

    container_topright: {
        position: 'absolute',
        top: 50,
        right: 25,
    },

    image_topright: {
        width: 35,
        height: 34,
    },

    container_cross: {
        // position: 'absolute',
        // top: 20,
        // right: 20,
    },

    image_cross: {
        width: 30,
        height: 30,
    },

})

export default CustomButton;