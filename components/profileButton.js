import React from 'react';
import { StyleSheet , TouchableOpacity , Text } from 'react-native';

const ProfileButton = ({onPress}) => {

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}> 
            <Text style={styles.text}>placeholder</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        right: 20,
    },

})

export default ProfileButton;