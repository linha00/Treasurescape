import React from 'react';
import { StyleSheet , Text , View, SafeAreaView, Button , Image} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import color from '../config/colors';

import TaskBar from '../components/taskBar';
import SidePanelButton from '../components/sidePanelButton';
import ProfileButton from '../components/profileButton';

function FriendsPage() {
    const navigation = useNavigation();

    const pressHandler = () => {
        // Auth.signOut();
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <SidePanelButton/>
            <ProfileButton />

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

})

export default FriendsPage;