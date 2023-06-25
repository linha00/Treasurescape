/* eslint-disable react/no-unescaped-entities */
import {StyleSheet, SafeAreaView, Text, Button, View, Modal, Image, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import { Tabs } from "expo-router"
import { useRouter } from 'expo-router';
import color from '../../config/colors';

import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/auth';
import CustomButton from '../../components/customButton';


//import map components 
import React, {useEffect} from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import * as location from 'expo-location';


function LogoTitle() {
    return (
      <Image
        style={{ width: 20, height: 20, top: 3}}
        source={require("../../assets/map.png")}
      />
    );
  }

/*function MapPage() {
    const navigation = useRouter();
    const { user } = useAuth();
    const [visible, setVisible] = useState(false);

    const correctPressed = async () => {
        setVisible(false);
        try {
            const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();
            let balance = data.gold;
            let mission = data.mission;
            if (mission != 0) {
                const { data } = await supabase
                .from('missions')
                .select('*')
                .eq('id', mission)
                .single();
                let reward = data.award;
                if (reward != 0 && mission != 3) {
                    await supabase
                    .from('profiles')
                    .update({ 
                        gold: balance + reward,
                        mission: mission + 1
                    })
                    .eq('id', user.id);
                    navigation.push('/mission');
                } else {
                    //temp solution for hiting the last mission
                    await supabase
                    .from('profiles')
                    .update({ 
                        gold: balance + reward,
                        mission: 1
                    })
                    .eq('id', user.id);
                    navigation.push('/mission');
                }
            }
        } catch(error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <Tabs.Screen 
                options={{
                    tabBarIcon: () => <LogoTitle />
                }}
            />
            <SafeAreaView style={styles.container}>
                <View style = {styles.top}>
                <CustomButton type="back" style={styles.back} onPress={() => navigation.back()}/>

                    <Text>map</Text>
                    <Button title='temp button for mission complete' onPress={() => setVisible(true)}/>
                    <Modal
                        visible = {visible}
                    >
                        <TouchableWithoutFeedback style = {styles.temp} onPress={correctPressed}>
                            <SafeAreaView style = {styles.correct}>
                                    <Image style = {styles.correctImage} source={require('../../assets/logo.png')} />
                                    <Text style = {styles.correctText}>That's Right!</Text>
                            </SafeAreaView>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>
                <View style = {styles.tab} >
                    <Text style = {{fontSize: 20, left: 10}}>Mission & Clues</Text>
                </View>
            </SafeAreaView>
        </>
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    top: {
        flex: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    tab: {
        flex: .3,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: color.primary,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
    },

    correct: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.gold,
    },

    correctImage: {
        width: 200,
        height: 200,
    },

    correctText: {
        fontSize: 30,
    },
})
*/
function MapPage() {

    const [pin, setPin] = React.useState({
        latitude: 1.2966, 
        longitude: 103.7764
    });
/*
    React.useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setPin(location);

        })()
    }, []);*/

    return (
        <View style={styles.container}>
            <MapView 
            style={styles.map} 
                initialRegion={{
                    latitude: 1.2966,
                    longitude: 103.7764,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation = {true} 
                //onUserLocationChange={(e) => {
                //    console.log("onUserLocationChange", e.nativeEvent.coordinate)
                //    ;
                //}}
            >
            <Marker
                coordinate={{latitude : 1.2966, longitude : 103.7764}}
                title={"National University of Singapore"}
                description='NUS'
                pinColor='red'
                draggable={true}
                onDragStart={(e) => {
                    console.log("Drag Start", e.nativeEvent.coordinate.longitude);
                }}
                onDragEnd={(e) => {
                    console.log("Drag End", e.nativeEvent.coordinate.latitude);
                    //SetPin({
                    //    latitude: e.nativeEvent.coordinate.latitude,
                    //    longitude: e.nativeEvent.coordinate.longitude,
                    //});
                }}   
            >
            </Marker>
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  }
);

export default MapPage;