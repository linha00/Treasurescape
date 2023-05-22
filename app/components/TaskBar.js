import React from 'react';
import { StyleSheet , View, TouchableOpacity , Text } from 'react-native';
import color from '../config/colors'

const onPress = (text) => {
    console.log(text + " taskbar pressed");
}

const TaskBar = () => {

    return (
        <View style={styles.container}> 
            <TouchableOpacity onPress={() => onPress("Home")} style={styles.task}> 
                <Text>image</Text>
                <Text style={styles.text}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onPress("Missions")} style={styles.task}>
                <Text>image</Text> 
                <Text style={styles.text}>Missions</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onPress("Map")} style={styles.task}> 
                <Text>image</Text>
                <Text style={styles.text}>Map</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onPress("Friends")} style={styles.task}> 
                <Text>image</Text>
                <Text style={styles.text}>Friends</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onPress("Shop")} style={styles.task}> 
                <Text>image</Text>
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
    }

})

export default TaskBar;