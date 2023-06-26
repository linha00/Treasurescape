/* eslint-disable react/no-unescaped-entities */

// import React from 'react';
import {StyleSheet, View, Image, Dimensions } from 'react-native';
import { Tabs } from "expo-router"
import MapView, { Marker } from 'react-native-maps';

const logo = Dimensions.get('window').width / 16;

function LogoTitle() {
    return (
      <Image
        style={{ width: logo, height: logo}}
        source={require("../../assets/map.png")}
      />
    );
  }

function MapPage() {

    // const [pin, setPin] = React.useState({
    //     latitude: 1.2966, 
    //     longitude: 103.7764
    // });

    return (
      <>
        <Tabs.Screen options={{tabBarIcon: () => <LogoTitle />}} />
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
        </>
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