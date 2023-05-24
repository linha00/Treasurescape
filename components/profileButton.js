import React from 'react';
import { StyleSheet , TouchableOpacity , Image } from 'react-native';

const ProfileButton = ({onPress}) => {

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}> 
            <Image style={styles.image} source={require('../assets/profile.png')}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        right: 25,
    },

    image: {
        width: 35,
        height: 34,
    },
})

export default ProfileButton;