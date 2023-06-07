import { useEffect, useState } from 'react';
import { Image, StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { Tabs } from "expo-router"
import { useRouter } from 'expo-router';
import color from '../../config/colors';

import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/auth';

import BackButton from '../../components/backButton';
import CustomButton from '../../components/customButton';

function LogoTitle() {
    return (
      <Image
        style={{ width: 30, height: 30, top: 2}}
        source={require("../../assets/missions.png")}
      />
    );
  }

function MissionPage() {
    const navigation = useRouter();

    const { user } = useAuth();
    const [missionId, setMissionId] = useState(0);
    const [text, setText] = useState("temp");


    useEffect(() => {
        async function getMission() {
            let {data} = await supabase.from('profiles').select().eq('id', user.id).single();
            let tempid = data.mission;
            if (missionId != null) {
                let {data} = await supabase.from('missions').select().eq('id', tempid).single();
                setMissionId(data.id);
                setText(data.description);
            }
        }
        getMission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Tabs.Screen 
                options={{
                    tabBarIcon: () => <LogoTitle />
                }}
            />
            <SafeAreaView style={styles.container}>
                <BackButton style={styles.back} onPress={() => navigation.back()}/>
                <View style={styles.container1}>
                    <Image style={styles.logo} 
                        source={require('../../assets/logo.png')} />
                </View>

                <View style={styles.container2}>
                    <Text style={styles.header}>
                        Mission {missionId}:
                    </Text>
                    
                    <View style={styles.box}>
                        <Text>{text}</Text>
                    </View>
                </View>

                <View style={styles.button}>
                    <CustomButton text= "Embak" onPress={() => navigation.push('/map')} />
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
        flex: 2,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },  

    container2: {
        flex: 2.5,
        width: '90%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 10,
    }, 

    button: {
        flex: 0.8,
        top: -50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        width: 280,
        height: 280,
        top: 30,
    },

    back: {
        position: 'absolute',
        top: 10,
        left: 10,
    },

    header: {
        fontSize: 25,
    },

    box: {
        backgroundColor: color.primary,
        width: '100%',
        height: '80%',
        paddingTop: 25,
        paddingHorizontal: 30,
        borderRadius: 30,
    },

})

export default MissionPage;