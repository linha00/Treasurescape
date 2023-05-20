import React from 'react';
import { Image, StyleSheet , Text , View, SafeAreaView , TextInput , Button } from 'react-native';

function StartScreen(props) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container1}>
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
                <View style={styles.box}>
                    <Text>placeholer</Text>
                </View>

                <View style={styles.box}>
                    <Text>placeholer</Text>
                </View>

                <View style={styles.box}>
                    <Text>placeholer</Text>
                </View>
            </View>

            <View style={styles.taskbar}>
                <Text style={styles.tasks}>
                    task1
                </Text>
                <Text style={styles.tasks}>
                    task2
                </Text>
                <Text style={styles.tasks}>
                    task3
                </Text>
                <Text style={styles.tasks}>
                    task4
                </Text>
                <Text style={styles.tasks}>
                    task5
                </Text>
            </View>

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
        backgroundColor: '#D3D3D3',
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
    
    username: {
        fontSize: 30,
        color: '#5A5A5A',
    },

    totalgold: {
        fontSize: 15,
        paddingLeft: 3,
    },

    gold: {
        fontSize: 35,
        color: '#FDDC5C',
        paddingLeft: 30,
    },

    box: {
        flex: 3,
        backgroundColor: 'blue',
    },
    
    taskbar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    tasks: {
    },

})

export default StartScreen;