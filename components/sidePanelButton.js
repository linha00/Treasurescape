import React from 'react';
import { StyleSheet , TouchableOpacity , Image } from 'react-native';

const SidePanelButton = ({onPress}) => {

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}> 
            <Image style={styles.image} source={require('../assets/sidePanel.png')}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        left: 20,
    },

    image: {
        width: 25,
        height: 25,
    },

})

export default SidePanelButton;