import { StyleSheet , Text , View, SafeAreaView, Image } from 'react-native';
import color from '../../config/colors'
import { useEffect, useState } from 'react';
import { Tabs } from "expo-router"

import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/auth';
import Shop from '../../components/shop';

function LogoTitle() {
    return (
      <Image
        style={{ width: 30, height: 30, top: 2}}
        source={require("../../assets/shop.png")}
      />
    );
}

function ShopPage() {
    const { user } = useAuth();
    const [gold, setGold] = useState(0);

    useEffect(() => {
        async function getName() {
            let {data} = await supabase.from('profiles').select().eq('id', user.id).single();
            setGold(data.gold);
        }
        getName();
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
                <View style={styles.container1}>
                    <View style={styles.texts}>
                        <Text style={styles.totalgold}>Total Gold:</Text>
                        <Text style={styles.gold}>{gold}g</Text>
                    </View>
                </View>

                <View style={styles.container2}>
                    <Text style={styles.header}>
                        Shop
                    </Text>

                    <View style={styles.shop}>
                        <Shop/>
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
        flex: 1,
        width: "100%",
        flexDirection: 'row',
        backgroundColor: color.secondary,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingLeft: 30,
        paddingRight: 50,
        paddingBottom: 20,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },

    container2: {
        flex: 6,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    },

    header: {
        fontSize: 35,
        color: color.quaternary,
        paddingTop: 30,
    },

    shop: {
        width: '90%',
        height: '85%',
        backgroundColor: color.primary,
        borderRadius: 20,
        borderWidth: 1,
        padding: 10,
        margin: 15,
    },

    gold: {
        color: color.gold
    },

})

export default ShopPage;