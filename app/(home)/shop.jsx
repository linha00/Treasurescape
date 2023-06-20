/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from 'react';
import { StyleSheet , Text , View, SafeAreaView, Image, FlatList, Dimensions } from 'react-native';
import color from '../../config/colors'
import { useFocusEffect } from '@react-navigation/native';
import { Tabs } from "expo-router"

import AppLoader from '../../components/AppLoader';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/auth';

import CustomButton from '../../components/customButton';

const windowWidth = Dimensions.get('window').width;
const componentWidth = (windowWidth / 3) - 30;
const componentHeight = componentWidth * 1.5;

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
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [items, setItem] = useState([
        {name: 'Temp', image:"tempUrl", price: 1000, key: '1'},
    ]);

    async function getName() {
        setLoading(true);
        let {data} = await supabase.from('profiles').select().eq('id', user.id).single();
        setGold(data.gold);
        setLoading(false);
        setRefresh(false);
    }

    async function getItems() {
        setLoading(true);
        let {data} = await supabase.from('shop').select();
        setItem(data);
        setLoading(false);
        setRefresh(false);
    }

    useEffect(() => {
        if (refresh) {
            getItems();
        }
    }, [refresh])

    useFocusEffect(
        React.useCallback(() => {
            getName();
            getItems();
        }, [])
    );

    const buy = (name) => {
        console.log('buy ' + name);
    }

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
                    <FlatList
                    data={items}
                    renderItem={({item}) => (
                    <View style={styles.box} key={item.key}>
                        <Image style={styles.image} source = {{uri : item.imageUrl}} />

                        <View style={styles.text}>
                            <Text style={styles.name}>
                                {item.name}
                            </Text>

                            <Text style={styles.price}>
                                ${item.price}
                            </Text>
                        </View>
                        <View style = {styles.buy}>
                        <CustomButton type="buy" text= "buy" onPress={() => buy(item.name)} />
                        </View>
                    </View>
                    )}
                    extraData={loading}
                    refreshing = {refresh}
                    onRefresh = {() => {setRefresh(true); setLoading(true);}}
                    />
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

    box: {
        flexDirection: 'row',
        width: "100%",
        height: componentHeight + 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 5,
        marginBottom: 10,
        borderBottomWidth: 1,
    },

    image: {
        width: componentWidth,
        height: componentHeight,
        left: -10,
    },

    text: {
        width: componentWidth + 30,
        top: 15,
    },

    buy: {
        top: 20,
    },

    name: {
        fontSize: 14,
        fontWeight: 'bold',
    },

    price: {
        fontSize: 12,
        color: color.gold,
    },

    desc: {
        fontSize: 11,
    },
})

export default ShopPage;