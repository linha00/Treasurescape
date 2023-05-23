import React, { useState } from 'react';
import { Image, StyleSheet , View , SafeAreaView , Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function forgotPasswordPage() {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <Text>asd</Text>            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default forgotPasswordPage;
