import React from 'react';
import { Image, StyleSheet , Text , View, SafeAreaView } from 'react-native';
import color from '../config/colors'

import TaskBar from '../components/taskBar';
import SidePanelButton from '../components/sidePanelButton';
import ProfileButton from '../components/profileButton';

function StartScreen({ navigation }) {

    const pressHandler = () => {
        navigation.goBack();
        console.warn("temp button to go back to login page");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container1}>
                <SidePanelButton onPress={pressHandler}/>
                <ProfileButton />
                <View style={styles.texts}>
                    <Text style={styles.username}>Username</Text>
                    <Text style={styles.totalgold}>Total Gold:</Text>
                    <Text style={styles.gold}>200g</Text>
                </View>

                <Text>
                    image placeholder
                </Text>
            </View>

            <View style={styles.container2}>
                <View style={styles.section}>
                    <Text style={styles.headers}>Misions</Text>
                    <View style={styles.box}>

                    </View>

                </View>

                <View style={styles.section}>
                    <Text style={styles.headers}>Map</Text>
                    <View style={styles.box}>

                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.headers}>Leaderboard</Text>
                    <View style={styles.box}>

                    </View>
                </View>
            </View>

            <TaskBar style={styles.taskbar}/>


        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    container1: {
        flex: 3,
        width: "100%",
        flexDirection: 'row',
        backgroundColor: color.secondary,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingLeft: 30,
        paddingRight: 50,
        paddingBottom: 20,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },

    container2: {
        flex: 9,
        width: "85%",
        marginVertical: 20,
    },

    section: {
        flex: 3,
        marginVertical: 5,        
    },

    headers: {
        fontSize: 20,
    },

    box: {
        backgroundColor: color.primary,
        width: '100%',
        height: '85%',
        borderRadius: 20,
    },

    username: {
        fontSize: 30,
        color: color.quaternary,
    },

    totalgold: {
        fontSize: 15,
        paddingLeft: 3,
    },

    gold: {
        fontSize: 35,
        color: color.gold,
        paddingLeft: 30,
    },

})

export default StartScreen;