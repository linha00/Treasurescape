import { useEffect, useState } from 'react';
import { StyleSheet , Text , View, SafeAreaView, Button , Image, TouchableWithoutFeedback, Modal} from 'react-native';
import { Tabs, useRouter } from "expo-router"
import color from '../../config/colors';

import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/auth';

import ProfileButton from '../../components/profileButton';

function LogoTitle() {
    return <Image style={{ width: 30, height: 30, top: 2}} source={require("../../assets/home.png")} />
}

function HomePage() {
    const navigation = useRouter();
    const { user } = useAuth();

    const [name, setName] = useState("");
    const [gold, setGold] = useState(0);
    const [profile, setProfile] = useState("temp");
    const [missionId, setMissionId] = useState(0);
    const [missionText, setMissionText] = useState("temp");

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        async function getStuff() {
            let {data} = await supabase.from('profiles').select().eq('id', user.id).single();
            setName(data.name);
            setGold(data.gold);
            setProfile(data.imageUrl);
            setMissionId(data.mission);

            if (missionId != null) {
                let {data} = await supabase.from('missions').select().eq('id', missionId).single();
                setMissionText(data.description);
            }
        }
        getStuff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Tabs.Screen options={{tabBarIcon: () => <LogoTitle />}} />
            <SafeAreaView style={styles.container}>
                <View style={styles.container1}>
                    <ProfileButton onPress={() => setVisible(true)}/>
                    <Modal
                        visible = {visible}
                        transparent = {true}
                    >
                        <TouchableWithoutFeedback style = {{alignItems: 'center', justifyContent: 'center'}} onPress={() => setVisible(false)}>
                            <SafeAreaView style = {styles.profile}>
                                    <Text style = {styles.profileText}>Temp</Text>
                            </SafeAreaView>
                        </TouchableWithoutFeedback>
                    </Modal>
                    <View style={styles.texts}>
                        <Text style={styles.username}>{name}</Text>
                        <TouchableWithoutFeedback onPress={() => navigation.push('/shop')}>
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
                        <TouchableWithoutFeedback onPress={() => navigation.push('/mission')}>
                            <View style={styles.box}>
                                <Text style = { styles.missionHeader}>Mission {missionId}:</Text>
                                <Text style = {styles.missionText}>{missionText}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.headers}>Map</Text>
                        <TouchableWithoutFeedback onPress={() =>navigation.push('/map')}>
                            <View style={[styles.box , styles.temp]}>
                                    <View style={styles.tempbuttom}>
                                        <Button onPress={() => supabase.auth.signOut()} title="temp signout button"/>
                                    </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.headers}>Leaderboard</Text>
                        <TouchableWithoutFeedback onPress={() => navigation.push('/friends')}>
                            <View style={styles.box}>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
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
})

export default HomePage;