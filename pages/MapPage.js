import React from 'react';
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import color from '../config/colors';

import TaskBar from '../components/taskBar';
import SidePanelButton from '../components/sidePanelButton';
import ProfileButton from '../components/profileButton';

function MapPage() {
    const navigation = useNavigation();

    const pressHandler = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style = {styles.top}>
                <SidePanelButton/>
                <ProfileButton />
                <Text>map</Text>
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

    top: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

})

export default MapPage;