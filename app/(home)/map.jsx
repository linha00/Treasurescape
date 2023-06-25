/* eslint-disable react/no-unescaped-entities */
import {StyleSheet, SafeAreaView, Text, View, Image, Dimensions } from 'react-native';
import { Tabs } from "expo-router"
import { useRouter } from 'expo-router';
import color from '../../config/colors';

import CustomButton from '../../components/customButton';

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
    const nav = useRouter();

    return (
        <>
            <Tabs.Screen 
                options={{
                    tabBarIcon: () => <LogoTitle />
                }}
            />
            <SafeAreaView style={styles.container}>
                <View style = {styles.top}>
                <CustomButton type="back" style={styles.back} onPress={() => nav.back()}/>

                    <Text>map</Text>

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

export default MapPage;