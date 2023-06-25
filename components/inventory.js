/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text, FlatList, Dimensions, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import color from '../config/colors.js';

import AppLoader from '../components/AppLoader';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/auth';

const windowWidth = Dimensions.get('window').width;
const componentWidth = (windowWidth / 3) - 30;
const componentHeight = componentWidth * 1.5;

const Inventory = () => {
    const { user } = useAuth();
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);

    const [items, setItems] = useState([
        {name: 'name', code:"codesadas1", image_url: "temp", key: '1'},
    ]);

    async function getItems() {
        setLoading(true);
        let {data} = await supabase.from('profiles').select().eq('id', user.id).single();
        const list = data.inventory;
        let out = [];

        for (var i = 0; i < list.length; i++) {
            let {data} = await supabase.from('item_code').select().eq('code', list[i]).single();
            if (!data.claimed) {
                out = out.concat([{key: i, name: data.name, image_url: data.image_url, code: data.code}]);
            }
        }
        setItems(out);
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
            getItems();
        }, [])
    );

    return (
        <>
            <View style = {styles.container}>
                <FlatList
                    data={items}
                    renderItem={({item}) => (
                        <View style={styles.box} key={item.key}>
                            <Image style={styles.image} source = {{uri : item.image_url}} />

                            <View style={styles.rightside}>
                                <Text style={styles.name}>
                                    {item.name}
                                </Text>
                                <Text style={styles.code}>
                                    {item.code}
                                </Text>
                            </View>
                        </View>
                    )}
                    extraData={loading}
                    refreshing = {refresh}
                    onRefresh = {() => {setRefresh(true); setLoading(true);}}
                />
            </View>
            {loading ? <AppLoader /> : null}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.secondary,
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
        flex: 1,
        width: componentWidth,
        height: componentHeight,
        left: -10,
    },

    rightside: {
        flex: 1,
        width: "60%",
        top: 15,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: '80%',
    },
    
    name: {
        fontSize: 17,
        fontWeight: 'bold',
    },

    code: {
        fontSize: 14
    },

    button: {
        flex: 1,
        left: 40
    },
})

export default Inventory;