import { useEffect, useState } from 'react';
import { StyleSheet , Text , View, SafeAreaView, Button , Image} from 'react-native';
import color from '../../config/colors';

import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/auth';

import ProfileButton from '../../components/profileButton';

function HomePage() {
    const { user } = useAuth();
    const [name, setName] = useState("");
    const [gold, setGold] = useState(0);
    const [profile, setProfile] = useState("temp");

    useEffect(() => {
        async function getName() {
            let {data} = await supabase.from('profiles').select().eq('id', user.id).single();
            setName(data.name);
            setGold(data.gold);
            setProfile(data.imageUrl);
        }
        getName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container1}>
                <ProfileButton />
                <View style={styles.texts}>
                    <Text style={styles.username}>{name}</Text>
                    <Text style={styles.totalgold}>Total Gold:</Text>
                    <Text style={styles.gold}>{gold}g</Text>
                </View>

                <Image style={styles.avatar} source={{uri: profile}}/>
            </View>

            <View style={styles.container2}>
                <View style={styles.section}>
                    <Text style={styles.headers}>Misions</Text>
                    <View style={[styles.box , styles.temp]}>
                        <View style={styles.tempbuttom}>
                            <Button onPress={() => supabase.auth.signOut()} title="temp signout button"/>
                        </View>
                    </View>

                </View>

                <View style={styles.section}>
                    <Text style={styles.headers}>Map</Text>
                    <View style={styles.box}>

                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.headers}>Leaderboard</Text>
                    <View style={styles.box}>

                    </View>
                </View>
            </View>
        </SafeAreaView>
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
    },

    box: {
        backgroundColor: color.primary,
        width: '100%',
        height: '85%',
        borderRadius: 20,
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
})

export default HomePage;