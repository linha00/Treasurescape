import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Dimensions, Button, Linking, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';

const logo = Dimensions.get('window').width / 16;

function LogoTitle() {
  return (
    <Image
      style={{ width: logo, height: logo }}
      source={require("../../assets/map.png")}
    />
  );
}

function MapPage() {
  const [userLocation, setUserLocation] = useState(null);
  const [startingLocation, setStartingLocation] = useState('Your location');
  const [destination, setDestination] = useState('');

  const startingLocationInputRef = useRef(null);

  useEffect(() => {
    const getPermissionAndLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Please grant location permissions");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
      setStartingLocation('Your location');
    };

    getPermissionAndLocation();
  }, []);

  const handleGetDirections = () => {
    if (startingLocation && destination) {
      const encodedStartingLocation = encodeURIComponent(startingLocation);
      const encodedDestination = encodeURIComponent(destination);

      const url = `https://www.google.com/maps/dir/?api=1&origin=${encodedStartingLocation}&destination=${encodedDestination}`;
      Linking.openURL(url);
    }
  };

  const handleStartingLocationFocus = () => {
    startingLocationInputRef.current?.setSelection(0, startingLocation.length);//to select the whole text
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust the value as per your UI requirements
    >
      <StatusBar style="auto" />
      <View style={styles.mapContainer}>
        {userLocation && (
          <MapView
            style={styles.map}
            showsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
          >
            {startingLocation !== 'Your location' && (
              <Marker
                coordinate={{
                  latitude: userLocation.coords.latitude,
                  longitude: userLocation.coords.longitude,
                }}
                title="Current Location"
              />
            )}
          </MapView>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Starting Location"
          value={startingLocation}
          onChangeText={setStartingLocation}
          onFocus={handleStartingLocationFocus}
          ref={startingLocationInputRef}
        />
        <TextInput
          style={styles.input}
          placeholder="Destination"
          value={destination}
          onChangeText={setDestination}
        />
        <Button title="Get Directions" onPress={handleGetDirections} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  inputContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
});

export default MapPage;
