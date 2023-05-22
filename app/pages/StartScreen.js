import React from 'react';
import { Image, StyleSheet , Text , View} from 'react-native';

function StartScreen() {
    return (
        <View style= {styles.container}>
            <Image style={styles.homeLogo} 
                source={require('../assets/logo.png')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    homeLogo: {
        width: 350,
        height: 350,
    }
})

export default StartScreen;