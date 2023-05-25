import React from 'react';
import { StyleSheet , View, TouchableOpacity , Text , Image } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import color from '../config/colors'

const TaskBar = () => {
    const navigation = useNavigation();
    
    const home = () => {
        navigation.goBack();
        navigation.navigate('Home');
    }
    const missions = () => {
        navigation.goBack();
        navigation.navigate('Mission');
    }
    const map = () => {
        navigation.goBack();
        navigation.navigate('Map');
    }
    const friends = () => {
        navigation.goBack();
        navigation.navigate('Friends');
    }
    const shop = () => {
        navigation.goBack();
        navigation.navigate('Shop');
    }
    return (
        <View style={styles.container}> 
            <TouchableOpacity onPress={home} style={styles.task}> 
                <Image style={styles.logo} source={require('../assets/home.png')}/>
                <Text style={styles.text}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={missions} style={styles.task}>
                <Image style={styles.logo} source={require('../assets/missions.png')}/>
                <Text style={styles.text}>Missions</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={map} style={styles.task}> 
                <Image style={styles.logo} source={require('../assets/map.png')}/>
                <Text style={styles.text}>Map</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={friends} style={styles.task}> 
                <Image style={styles.logo} source={require('../assets/friends.png')}/>
                <Text style={styles.text}>Friends</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={shop} style={styles.task}> 
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