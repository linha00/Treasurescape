import React from 'react';
import { StyleSheet , TouchableOpacity , Text } from 'react-native';

const SidePanelButton = ({onPress}) => {

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
        left: 20,
    },

})

export default SidePanelButton;