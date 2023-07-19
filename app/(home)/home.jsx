/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { Text , View, SafeAreaView, Image, TouchableWithoutFeedback, Dimensions, Modal, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router"
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import color from '../../config/colors';
import styles from '../../config/homepageStyle';

import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/auth';

import AppLoader from '../../components/AppLoader';
import CustomButton from '../../components/customButton';
import { Camera } from 'expo-camera';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

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
    const [top3, settop3] = useState([
        {name: 'temp', image:"placeholder", mission: '1', key: '1'},
        {name: 'temp', image:"placeholder", mission: '1', key: '2'},
        {name: 'temp', image:"placeholder", mission: '1', key: '3'},
    ]);
    
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

        //get leaderboard
        
        let database = await supabase.from('profiles').select('*');
        let temp_name = [];
        let temp_image = [];
        let temp_mission = [];
        let first = -1;
        let second = -1;
        let third = -1;

        for (var i = 0; i< database.data.length; i++) {
            if (first == -1 || database.data[i].mission > temp_mission[first]) {
                temp_name = temp_name.concat([database.data[i].name]);
                temp_image = temp_image.concat([database.data[i].imageUrl]);
                temp_mission = temp_mission.concat([database.data[i].mission]);
                second = first;
                first = temp_image.length - 1;
            } else if (database.data[i].mission == temp_mission[first] || database.data[i].mission > temp_mission[second]) {
                temp_name = temp_name.concat([database.data[i].name]);
                temp_image = temp_image.concat([database.data[i].imageUrl]);
                temp_mission = temp_mission.concat([database.data[i].mission]);
                third = second;
                second = temp_image.length - 1;
            } else if (database.data[i].mission == temp_mission[second] || database.data[i].mission > temp_mission[third]) {
                temp_name = temp_name.concat([database.data[i].name]);
                temp_image = temp_image.concat([database.data[i].imageUrl]);
                temp_mission = temp_mission.concat([database.data[i].mission]);
                third = temp_image.length - 1;
            }
        }

        let templistout = [];
        templistout = templistout.concat([{name: temp_name[first], image: temp_image[first], mission: temp_mission[first], key: '1'}]);
        templistout = templistout.concat([{name: temp_name[second], image: temp_image[second], mission: temp_mission[second], key: '1'}]);
        templistout = templistout.concat([{name: temp_name[third], image: temp_image[third], mission: temp_mission[third], key: '1'}]);

        settop3(templistout)

        setLoading(false);
    }
    
    useFocusEffect(
        React.useCallback(() => {
            getStuff();
        }, [])
    )

    useEffect(() => {
        if (loading) {
            getStuff();
        }
    }, [loading])

    //profile 
    const [image, setimage] = useState(null);
    const [profileMenu, setProfileMenu] = useState(false);
    
    const [hasPermission, setPermission] = useState(null);
    const [cameraDirection, setCameraDirection] = useState(Camera.Constants.Type.front);
    
    const handle_profile_upload = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        })
        if (!result.canceled) {
            let photo = result.assets[0];
            let fileName = photo.uri.replace(/^.*[\\/]/,"");
            setimage(photo.uri);
            let formData = new FormData();
            formData.append("files", {
                uri: photo.uri,
                name: fileName,
                type: `image/jpg`,
            })
            let {data, error} = await supabase.storage
                .from("images")
                .upload(fileName, formData);

            if (error) {
                console.log("error: " + error.message)
            }

            await supabase
            .from('profiles')
            .update({ 
                imageUrl: supabase.storage.from('images').getPublicUrl(data.path).data.publicUrl,
            })
            .eq('id', user.id);
            setLoading(true);
        }
    }
        
    //camera
    const [camera, setCamera] = useState(false);
    const [photoTaken, setPhotoTaken] = useState(false);
    const [publicurltemp, setPublicurl] = useState(false);
    const cameraRef = useRef(null);

    const takePicture = async () => {
        if (cameraRef) {
            try {
                let photo = await cameraRef.current.takePictureAsync({
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });
                if (!photo.canceled){
                    setPhotoTaken(true);
                    let fileName = photo.uri.replace(/^.*[\\/]/,"");
                    setimage(photo.uri);
                    let formData = new FormData();
                    formData.append("files", {
                        uri: photo.uri,
                        name: fileName,
                        type: `image/jpg`,
                    })
                    let {data, error} = await supabase.storage
                        .from("images") 
                        .upload(fileName, formData);
    
                    if (error) {
                        console.log("error: " + error.message)
                    }
                    setPublicurl(supabase.storage.from('images').getPublicUrl(data.path).data.publicUrl);
                }
            } catch (e) {
                console.log("Error: profile camera " + e);
            }
        }
    };

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
                                            <CustomButton text= "camera" type='profileButton' onPress={() => {setCamera(true); setPhotoTaken(false)}}/>
                                            <Modal
                                                animationType = {'fade'}
                                                transparent = {true}
                                                visible = {camera}
                                            >
                                                {photoTaken ? 
                                                    <View style = {styles.profile_container}>
                                                        <View style = {styles.profile_menu_photo_taken}>
                                                            <Text style = {styles.profile_menu_header}>Use this as Profile?</Text>
                                                            <Image
                                                                source = {{uri: image}}
                                                                style = {styles.profile_photo_taken}
                                                            />
                                                            <View style={styles.profile_photo_taken_button_group}>
                                                                <TouchableOpacity
                                                                    style={styles.photo_taken_button}
                                                                    onPress={async () => {
                                                                        await supabase
                                                                            .from('profiles')
                                                                            .update({ 
                                                                                imageUrl: publicurltemp,
                                                                            })
                                                                            .eq('id', user.id);
                                                                        setLoading(true);
                                                                        setCamera(false)
                                                                    }}
                                                                >
                                                                    <Text style = {{color: color.white, fontSize: temp_size * 3}}>Yes</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity
                                                                    style={styles.photo_taken_button}
                                                                    onPress={async () => setPhotoTaken(false)}
                                                                >
                                                                    <Text style = {{color: color.white, fontSize: temp_size * 3}}>No</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                            

                                                        </View>
                                                    </View>
                                                    : <Camera style = {{flex: 1}} type={cameraDirection} ref={cameraRef}>
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
                                                                }}
                                                            >
                                                                <Text style = {{color: color.white, fontSize: temp_size * 1.5}}>Flip</Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                style={styles.camera_button}
                                                                onPress={async () => takePicture()}
                                                            >
                                                                <Text style = {{color: color.white, fontSize: temp_size * 3}}>Photo</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </Camera>
                                                }
                                            </Modal>
                                        </View>
                                        <View style = {styles.profile_menu_button}>
                                            <CustomButton text ="upload" type= 'profileButton' onPress={handle_profile_upload}/>
                                        </View>
                                    </View>
                                </View>
                                <View style = {styles.log_out_button}>
                                                <CustomButton text ="logout" type= 'profileButton' onPress={() => supabase.auth.signOut()}/>
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
                            <MapView 
                                style={[styles.home_box]}
                                provider={PROVIDER_GOOGLE}
                                initialRegion={{
                                    latitude: 1.2966,
                                    longitude: 103.7764,
                                    latitudeDelta: 0.015,
                                    longitudeDelta: 0.0421,
                                }}
                            /> 
                        </TouchableWithoutFeedback>
                    </View>
                    
                    {/* Leaderboard */}
                    <View style={styles.home_section}>
                        <Text style={styles.headers}>Leaderboard</Text>
                        <TouchableWithoutFeedback onPress={() => nav.push('/friends')}>
                            <View style={styles.leaderboard_box}>
                                <View style={styles.leaderboard_column}>
                                    <Image style={styles.leaderboard_image} source={{uri: top3[1].image}}/>
                                    <View style={styles.leaderboard_2nd}>
                                        <Text>mission {top3[1].mission}</Text>
                                    </View>
                                    <Text style={styles.leaderboard_text}>2nd</Text>
                                </View>
                                <View style={styles.leaderboard_column}>
                                    <Image style={styles.leaderboard_image} source={{uri: top3[0].image}}/>
                                    <View style={styles.leaderboard_1st}>
                                    <Text>mission {top3[0].mission}</Text>
                                    </View>
                                    <Text style={styles.leaderboard_text}>1st</Text>
                                </View>
                                <View style={styles.leaderboard_column}>
                                    <Image style={styles.leaderboard_image} source={{uri: top3[2].image}}/>
                                    <View style={styles.leaderboard_3rd}>
                                    <Text>mission {top3[2].mission}</Text>
                                    </View>
                                    <Text style={styles.leaderboard_text}>3rd</Text>
                                </View>
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