/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { StyleSheet , Text , View, SafeAreaView, Button , Image, TouchableWithoutFeedback, Dimensions, Modal } from 'react-native';
import { Tabs, useRouter } from "expo-router"
import { useFocusEffect } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import color from '../../config/colors';

import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/auth';

import AppLoader from '../../components/AppLoader';
import CustomButton from '../../components/customButton';

const logo = Dimensions.get('window').width / 16;

function LogoTitle() {
    return (
        <Image 
            style={{ width: logo, height: logo}} 
            source={require("../../assets/home.png")} 
        />
    );
}

function HomePage() {
    const nav = useRouter();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [gold, setGold] = useState(0);
    const [profile, setProfile] = useState("temp");
    const [missionId, setMissionId] = useState(0);
    const [missionText, setMissionText] = useState("temp");
    const [modalVisible, setModalVisible] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const {control, handleSubmit, formState: {errors}} = useForm();

    async function getStuff() {
        setLoading(true);
        let {data} = await supabase.from('profiles').select().eq('id', user.id).single();
        let temp = data.mission;
        setName(data.name);
        setGold(data.gold);
        setProfile(data.imageUrl);
        setMissionId(data.mission);

        if (missionId != temp) {
            let {data} = await supabase.from('missions').select().eq('id', temp).single();
            setMissionText(data.description);
        }
        setLoading(false);
    }
    
    useFocusEffect(
        React.useCallback(() => {
            getStuff();
        }, [])
    );

    return (
        <>
            <Tabs.Screen options={{tabBarIcon: () => <LogoTitle />}} />
            <SafeAreaView style={styles.container}>
                <View style={styles.container1}>
                    <CustomButton type='profile' onPress={() => setModalVisible(true)}/>
                    <Modal
                        animationType = {'fade'}
                        transparent = {true}
                        visible = {modalVisible}
                    >
                        <View style = {styles.menuContainer}>
                            <View style = {styles.menu}>
                                <View style = {styles.top}>
                                    <Text style = {styles.header}>Profile</Text>
                                    <CustomButton 
                                        style = {styles.cross} 
                                        type='cross' 
                                        onPress={() => setModalVisible(false)}
                                    />
                                </View>
                                <Text>placeholder</Text>
                            </View>
                        </View>
                    </Modal>

                    <View style={styles.texts}>
                        <Text style={styles.username}>{name}</Text>
                        <TouchableWithoutFeedback onPress={() => nav.push('/shop')}>
                            <View>
                                <Text style={styles.totalgold}>Total Gold:</Text>
                                <Text style={styles.gold}>{gold}g</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <Image style={styles.avatar} source={{uri: profile}}/>
                </View>

                <View style={styles.container2}>
                    <View style={styles.section}>
                        <Text style={styles.headers}>Misions</Text>
                        <TouchableWithoutFeedback onPress={() => nav.push('/mission')}>
                            <View style={styles.box}>
                                <Text style = { styles.missionHeader}>Mission {missionId}:</Text>
                                <Text style = {styles.missionText}>{missionText}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.headers}>Map</Text>
                        <TouchableWithoutFeedback onPress={() =>nav.push('/map')}>
                            <View style={[styles.box , styles.temp]}>
                                    <View style={styles.tempbuttom}>
                                        <Button onPress={() => supabase.auth.signOut()} title="temp signout button"/>
                                    </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.headers}>Leaderboard</Text>
                        <TouchableWithoutFeedback onPress={() => nav.push('/friends')}>
                            <View style={styles.box}>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </SafeAreaView>
            {loading ? <AppLoader /> : null}
        </>
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    container1: {
        flex: 3,
        width: "100%",
        flexDirection: 'row',
        backgroundColor: color.secondary,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingLeft: 30,
        paddingRight: 50,
        paddingBottom: 20,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },

    container2: {
        flex: 9,
        width: "85%",
        marginVertical: 20,
    },

    section: {
        flex: 3,
        marginVertical: 5,        
    },

    headers: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    box: {
        backgroundColor: color.primary,
        width: '100%',
        height: '85%',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },

    username: {
        fontSize: 30,
        color: color.quaternary,
    },

    totalgold: {
        fontSize: 15,
        paddingLeft: 3,
    },

    gold: {
        fontSize: 35,
        color: color.gold,
        paddingLeft: 30,
    },

    tempbuttom: {
        width: '50%',
    },

    temp: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatar: {
        width: 150,
        height: 150,
        top: 15,
        left: 0,
    },

    missionHeader: {
        fontSize: 17,
    },

    profile: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        backgroundColor: color.primary,
    },

    menuContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#000000aa",
    },

    menu: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 20,
        width: '90%',
        height: '80%',
        padding: 20,
        backgroundColor: color.primary,
    },

    top: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    header: {
        flex: 1,
        fontSize: 25,
        left: 135,
    },
})

export default HomePage;