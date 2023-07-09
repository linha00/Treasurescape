/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { Text , View, SafeAreaView, Button , Image, TouchableWithoutFeedback, Dimensions, Modal, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router"
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import color from '../../config/colors';
import styles from '../../config/style';

import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/auth';

import AppLoader from '../../components/AppLoader';
import CustomButton from '../../components/customButton';
import { Camera } from 'expo-camera';

const temp_size = Dimensions.get('window').height / 50;

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
    }
    
    useFocusEffect(
        React.useCallback(() => {
            getStuff();
        }, [])
    )

    //profile 
    const [image, setimage] = useState(null);
    const [profileMenu, setProfileMenu] = useState(false);
    const [camera, setCamera] = useState(false);

    const [hasPermission, setPermission] = useState(null);
    const [cameraDirection, setCameraDirection] = useState(Camera.Constants.Type.front);
    
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
        console.log(temp_size)
    }, []);

    if (hasPermission == null) {
        return <View />;
    } else if (hasPermission == false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.home_topbar}>
                    {/* profile menu  */}
                    <CustomButton type='profile' onPress={() => setProfileMenu(true)}/>
                    <Modal
                        animationType = {'fade'}
                        transparent = {true}
                        visible = {profileMenu}
                    >
                        <View style = {styles.profile_container}>
                            <View style = {styles.profile_menu}>
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
                                            <CustomButton text= "camera" type='profileButton' onPress={() => setCamera(true)}/>
                                            <Modal
                                                animationType = {'fade'}
                                                transparent = {true}
                                                visible = {camera}
                                            >
                                                <Camera style = {{flex: 1}} type ={cameraDirection}>
                                                    <View style={{flex: 1}}>
                                                        <View style = {styles.camera_cross}>
                                                            <CustomButton 
                                                                type='cross' 
                                                                onPress={() => setCamera(false)}
                                                            />
                                                        </View>
                                                    </View>
                                                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                                                        <TouchableOpacity
                                                            style={styles.camera_button}
                                                            onPress={() => {
                                                                setCameraDirection(
                                                                    cameraDirection === Camera.Constants.Type.back
                                                                        ? Camera.Constants.Type.front
                                                                        : Camera.Constants.Type.back
                                                            );
                                                        }}>
                                                            <Text style = {{color: color.white, fontSize: 20}}>Flip</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </Camera>
                                            </Modal>
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
                    <TouchableWithoutFeedback onPress={() => setProfileMenu(true)}>
                        <Image style={styles.home_avatar} source={{uri: profile}}/>
                    </TouchableWithoutFeedback>
                    <View style={{marginLeft: temp_size}}>
                        <Text style={styles.home_username}>{name}</Text>
                        <TouchableWithoutFeedback onPress={() => nav.push('/shop')}>
                            <View>
                                <Text style={styles.home_totalgoldText}>Total Gold:</Text>
                                <Text style={styles.home_gold}>{gold}g</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                </View>

                <View style={styles.home_middleScreen}>
                    {/* missions */}
                    <View style={styles.home_section}>
                        <Text style={styles.headers}>Misions</Text>
                        <TouchableWithoutFeedback onPress={() => nav.push('/mission')}>
                            <View style={styles.home_box}>
                                <Text style = {{fontSize: temp_size * 1.1}}>Mission {missionId}:</Text>
                                <Text style = {{fontSize: temp_size}}>{missionText}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    {/* map */}
                    <View style={styles.home_section}>
                        <Text style={styles.headers}>Map</Text>
                        <TouchableWithoutFeedback onPress={() =>nav.push('/map')}>
                            <View style={[styles.home_box , styles.temp_signout]}>
                                    <View style={styles.temp_signout_buttom}>
                                        <Button onPress={() => supabase.auth.signOut()} title="temp signout button"/>
                                    </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    
                    {/* Leaderboard */}
                    <View style={styles.home_section}>
                        <Text style={styles.headers}>Leaderboard</Text>
                        <TouchableWithoutFeedback onPress={() => nav.push('/friends')}>
                            <View style={styles.home_box}>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </SafeAreaView>
            {loading ? <AppLoader /> : null}
        </>
    ); 
}

export default HomePage;