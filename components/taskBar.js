import React from 'react';
import { StyleSheet , View, TouchableOpacity , Text , Image } from 'react-native';
import color from '../config/colors'

const onPress = (text) => {
    console.log(text + " taskbar pressed");
}

const TaskBar = () => {

    return (
        <View style={styles.container}> 
            <TouchableOpacity onPress={() => onPress("Home")} style={styles.task}> 
                <Image style={styles.logo} source={require('../assets/home.png')}/>
                <Text style={styles.text}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onPress("Missions")} style={styles.task}>
                <Image style={styles.logo} source={require('../assets/missions.png')}/>
                <Text style={styles.text}>Missions</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onPress("Map")} style={styles.task}> 
                <Image style={styles.logo} source={require('../assets/map.png')}/>
                <Text style={styles.text}>Map</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onPress("Friends")} style={styles.task}> 
                <Image style={styles.logo} source={require('../assets/friends.png')}/>
                <Text style={styles.text}>Friends</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onPress("Shop")} style={styles.task}> 
                <Image style={styles.logo} source={require('../assets/shop.png')}/>
                <Text style={styles.text}>Shop</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderTopWidth: 1,
        paddingHorizontal: 2,
    },

    task: {
        flex: 1,
        alignItems: 'center',
        height: '100%',
        backgroundColor: color.primary,
        justifyContent: 'center',
    },

    text: {
        fontSize: 15,
        fontWeight: 'bold',
    },

    logo: {
        width: 30,
        height: 30,
    },

})

export default TaskBar;