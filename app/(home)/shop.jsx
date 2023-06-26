/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from 'react';
import { StyleSheet , Text , View, SafeAreaView, Image, FlatList, Dimensions, Modal, Alert } from 'react-native';
import color from '../../config/colors'
import { useFocusEffect } from '@react-navigation/native';
import { Tabs } from "expo-router"

import AppLoader from '../../components/AppLoader';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/auth';

import CustomButton from '../../components/customButton';
import Inventory from '../../components/inventory';

const windowWidth = Dimensions.get('window').width;
const logo = Dimensions.get('window').width / 16;
const componentWidth = (windowWidth / 3) - 30;
const componentHeight = componentWidth * 1.5;

function LogoTitle() {
    return (
      <Image
        style={{ width: logo, height: logo}}
        source={require("../../assets/shop.png")}
      />
    );
}

function ShopPage() {
    const { user } = useAuth();
    const [gold, setGold] = useState(0);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [items, setItem] = useState([
        {name: 'Temp', image:"tempUrl", price: 1000, stock: 1, key: '1'},
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
            getName();
        }
    }, [refresh])

    useFocusEffect(
        React.useCallback(() => {
            getName();
            getItems();
        }, [])
    );

    const buy = async (name, stock, price, image_url) => {
        if (stock == 0) {
            Alert.alert("Item out of stock");
        } else if (price > gold) {
            Alert.alert("Not enough gold");
        } else {
            const userData = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
            let out = userData.data.inventory;
            
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < 15) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
            }
            let temp = [result]
            if (out.length > 0) {
                out = out.concat(temp);
            } else {
                out = temp;
            }

            await supabase
                .from('profiles')
                .update({ 
                    inventory: out,
                    gold: gold - price,
                })
                .eq('id', user.id);
            
            temp = stock - 1;
            await supabase
                .from('shop')
                .update({ 
                    stock: temp,
                })
                .eq('name', name);
            
            await supabase
                .from('item_code')
                .insert({ 
                    name: name,
                    code: result,
                    image_url: image_url,

                })
                .eq('name', name);

            setRefresh(true);
            Alert.alert(name + " purchase successfully");
            console.log(out)
        }

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
                    <View>
                        <Text style={styles.totalgold}>Total Gold:</Text>
                        <Text style={styles.gold}>{gold}g</Text>
                    </View>
                    <CustomButton type= "inv" onPress={() => setModalVisible(true)} />
                    
                    <Modal
                        animationType = {'fade'}
                        transparent = {true}
                        visible = {modalVisible}
                    >
                        <View style = {styles.inv_container}>
                            <View style = {styles.inv}>
                                <View style = {styles.inv_top}>
                                    <Text style = {styles.inv_header}>Inventory</Text>
                                    <CustomButton 
                                        style = {styles.cross} 
                                        type='cross' 
                                        onPress={() => setModalVisible(false)}
                                    />
                                </View>
                                <View style = {styles.inv_bottom}>
                                    <Inventory />
                                </View>
                            </View>
                        </View>
                    </Modal>
                
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

                                        <Text style={styles.stocks}>
                                            stock: {item.stock}
                                        </Text>

                                        <Text style={styles.price}>
                                            {item.price}g
                                        </Text>
                                    </View>
                                    <View style = {styles.buy}>
                                        <CustomButton type="buy" text= "buy" onPress={() => buy(item.name, item.stock, item.price, item.imageUrl)} />
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
        justifyContent: 'space-between',
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
        fontWeight: 'bold'
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
        color: color.gold,
        fontSize: 20,
    },

    box: {
        flex: 1,
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
        flex: 1,
        width: componentWidth,
        height: componentHeight,
        left: -10,
    },

    text: {
        flex: 1,
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
        fontSize: 18,
        color: color.gold,
    },

    desc: {
        fontSize: 11,
    },

    inv_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#000000aa",
    },

    inv: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 20,
        width: '90%',
        height: '80%',
        padding: 20,
        backgroundColor: color.primary,
    },

    inv_top: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    inv_header: {
        flex: 1,
        fontSize: 25,
        left: 110,
        fontWeight: 'bold'
    },

    inv_bottom: {
        flex: 9,
        width: "95%",
        backgroundColor: color.gold,
        bottom: 10,
    },
})

export default ShopPage;