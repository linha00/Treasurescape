import { StyleSheet , TouchableOpacity , Text, Image, Dimensions } from 'react-native';
import color from '../config/colors'

const temp_size = Dimensions.get('window').height / 50;

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
    } else if (type == "inv") {
        return (
            <TouchableOpacity onPress={onPress} style={styles.container_cross}> 
                <Image style={styles.image_backpack} source={require('../assets/backpack.png')}/>
            </TouchableOpacity>
        );
    } else if (type == "profileButton") {
        return (
            <TouchableOpacity onPress={onPress} style={styles[`container_${type}`]}> 
                <Text style={styles[`text_${type}`]}>{text}</Text>
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

    image_backpack: {
        width: 50,
        height: 50,
        left: 20,
    },

    image_cross: {
        width: 30,
        height: 30,
    },

    container_show_code: {
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: color.lightBlue,
        margin: 3,
        alignContent: "center",
    },

    text_show_code: {
        fontSize: 15,
        color: color.black,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },

    container_profileButton: {
        borderRadius: 15,
        padding: temp_size * 0.5, 
        backgroundColor: color.tertiary,
        alignContent: "center",
    },

    text_profileButton: {
        fontSize: temp_size * 1.6,
        color: color.black,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },

})

export default CustomButton;