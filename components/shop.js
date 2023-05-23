import React, { useState } from 'react';
import { StyleSheet , Text , View, FlatList , ScrollView} from 'react-native';
import color from '../config/colors'

import BuyButton from './buyButton';

function Shop(props) {
    const [items, setItem] = useState([
        {name: 'NUS Dri-fit Shirt', image:"placeholder", gold: 1000, key: '1'},
        {name: 'Starbucks gift Card', image:"placeholder", gold: 2500, key: '2'},
        {name: 'Maxx Coffee', image:"placeholder", gold: 600, key: '3'},
        {name: 'LiHo Milk Tea', image:"placeholder", gold: 500, key: '4'},
        {name: 'test 1', image:"placeholder", gold: 2000, key: '5'},
        {name: 'test 2', image:"placeholder", gold: 3000, key: '6'},
    ]);

    const buy = (name) => {
        console.log('buy ' + name);
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={({item}) => (
                <View style={styles.box} key={item.key}>
                    <Text style={styles.image}>
                        {item.image}
                    </Text>

                    <View style={styles.text}>
                        <Text style={styles.name}>
                            {item.name}
                        </Text>

                        <Text style={styles.gold}>
                            {item.gold}g
                        </Text>
                    </View>

                    <BuyButton text= "buy" onPress={() => buy("placeholder")} />
                </View>
                )}/>
        </View>        
    ); 
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    box: {
        flexDirection: 'row',
        width: "93%",
        height: 170,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 5,
        marginBottom: 10,
        borderBottomWidth: 1,
    },

    image: {
        width: 100,
        height: 140,
        backgroundColor: color.gold,
    },

    name: {
        fontSize: 20,
        top: 20,
    },

    gold: {
        fontSize: 15,
        top: 15,
        color: color.gold,
    },

})

export default Shop;