import {StyleSheet, SafeAreaView, View, Image } from 'react-native';

import ProfileButton from '../../components/profileButton';
import Friends from '../../components/friends';

function FriendsPage() {

    return (
        <SafeAreaView style={styles.container}>
            <ProfileButton />
            <View style = {styles.group}>
                <View style = {styles.box}>
                    <Friends/>
                </View>
                <Image style = {styles.image} source = {require('../../assets/logo.png')}/>
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

    box: {
        width: '90%',
        height: '75%',
        padding: 5,
        borderWidth: 1,
        borderRadius: 25,
    },

    image: {
        width: 170,
        height: 170,
        top: -10,
    },

    group: {
        alignItems: 'center',
        justifyContent: 'center',
        top: 50,
    },
    
})

export default FriendsPage;