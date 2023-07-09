/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { StyleSheet , Text , View, SafeAreaView, Button , Image, TouchableWithoutFeedback, Dimensions, Modal } from 'react-native';
import { Tabs, useRouter } from "expo-router"
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import color from '../../config/colors';

import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/auth';

import AppLoader from '../../components/AppLoader';
import CustomButton from '../../components/customButton';
import { Camera } from 'expo-camera';

function HomePage() {
    const nav = useRouter();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    // general
    const [name, setName] = useState("");
    const [gold, setGold] = useState(0);
    const [profile, setProfile] = useState("temp");
    const [missionId, setMissionId] = useState(0);
    const [missionText, setMissionText] = useState("temp");
    
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
    };
    
    useFocusEffect(
        React.useCallback(() => {
            getStuff();
        }, [])
    );

    //profile 
    const [image, setimage] = useState(null);
    const [profileMenu, setProfileMenu] = useState(false);

    const [hasPermission, setPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    
    const handle_profile_upload = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        })
        if (!result.canceled) {
            let upload_image = result.assets[0].uri
            console.log(upload_image)

            // const {data, error} = await supabase.storage.from('images').upload(`${new Date().getTime()}`,
            //     {
            //         uri: result.assets[0].uri,
            //         type: 'jpg',
            //         name: 'name'
            //     })
            
            //     if (error) {
            //     setLoading(false);
            //     return;
            // }
        }
    }

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setPermission(status == 'granted');
        })();
    }, []);

    if (hasPermission == null) {
        return <View />;
    } else if (hasPermission == false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.container1}>
                    {/* profile menu  */}
                    <CustomButton type='profile' onPress={() => setProfileMenu(true)}/>
                    <Modal
                        animationType = {'fade'}
                        transparent = {true}
                        visible = {profileMenu}
                    >
                        <View style = {styles.menuContainer}>
                            <View style = {styles.menu}>
                                <View style = {styles.profile_menu_top}>
                                    <Text style = {styles.profile_menu_header}>Profile</Text>
                                    <View style = {styles.cross}>
                                        <CustomButton 
                                            type='cross' 
                                            onPress={() => setProfileMenu(false)}
                                        />
                                    </View>
                                </View>
                                <View style = {styles.profile_menu_bottom}>
                                    <Image style={styles.profile_menu_avatar} source={{uri: profile}}/>
                                    <View style = {styles.profile_menu_button_group}>
                                        <View style = {styles.profile_menu_button}>
                                            <CustomButton text= "camera" type='profileButton'/>
                                        </View>
                                        <View style = {styles.profile_menu_button}>
                                            <CustomButton text ="upload" type= 'profileButton' onPress={handle_profile_upload}/>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    {/* top box */}
                    <View>
                        <Text style={styles.username}>{name}</Text>
                        <TouchableWithoutFeedback onPress={() => nav.push('/shop')}>
                            <View>
                                <Text style={styles.totalgoldText}>Total Gold:</Text>
                                <Text style={styles.gold}>{gold}g</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <TouchableWithoutFeedback onPress={() => setProfileMenu(true)}>
                        <Image style={styles.avatar} source={{uri: profile}}/>
                    </TouchableWithoutFeedback>

                </View>

                <View style={styles.middleScreen}>
                    {/* missions */}
                    <View style={styles.section}>
                        <Text style={styles.headers}>Misions</Text>
                        <TouchableWithoutFeedback onPress={() => nav.push('/mission')}>
                            <View style={styles.box}>
                                <Text style = { styles.missionHeader}>Mission {missionId}:</Text>
                                <Text style = {styles.missionText}>{missionText}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    {/* map */}
                    <View style={styles.section}>
                        <Text style={styles.headers}>Map</Text>
                        <TouchableWithoutFeedback onPress={() =>nav.push('/map')}>
                            <View style={[styles.box , styles.temp_signup]}>
                                    <View style={styles.temp_signup_buttom}>
                                        <Button onPress={() => supabase.auth.signOut()} title="temp signout button"/>
                                    </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    
                    {/* Leaderboard */}
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

    middleScreen: {
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

    totalgoldText: {
        fontSize: 15,
        paddingLeft: 3,
    },

    gold: {
        fontSize: 35,
        color: color.gold,
        paddingLeft: 30,
    },

    temp_signup_buttom: {
        width: '50%',
    },

    temp_signup: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatar: {
        width: Dimensions.get('window').width / 4 + 10,
        height: (Dimensions.get('window').width / 4 + 10) * 1.1,
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
        borderRadius: 20,
        width: '80%',
        height: '70%',
        padding: 20,
        backgroundColor: color.primary,
    },

    profile_menu_top: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    profile_menu_header: {
        fontSize: 25,
    },

    cross: {
        position: 'absolute',
        left:  (Dimensions.get('window').width / 2) * 7.5 / 10
    },

    profile_menu_bottom: {
        flex: 13,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        // backgroundColor: color.lightBlue,
    },

    profile_menu_avatar: {
        width: Dimensions.get('window').width / 3 * 2,
        height: (Dimensions.get('window').width / 3 * 2) * 1.1,
        top: 15,
    },

    profile_menu_button_group: {
        flexDirection: 'row',
        width: '100%',
        // backgroundColor: color.black,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    profile_menu_button: {
        width: '45%',
    },
})

export default HomePage;