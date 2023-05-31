import React, { useState } from 'react';
import { StyleSheet , Text , View, FlatList , Dimensions } from 'react-native';
import color from '../config/colors'

import BuyButton from './buyButton';

const windowWidth = Dimensions.get('window').width;
const componentWidth = (windowWidth / 3) - 30;
const componentHeight = componentWidth * 1.5;

function Friends() {
    const [items, setItem] = useState([
        {name: 'NUS Dri-fit Shirt', image:"placeholder", online: true, key: '1'},
        {name: 'Starbucks gift Card', image:"placeholder", online: false, key: '2'},
        {name: 'Maxx Coffee', image:"placeholder", online: true, key: '3'},
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

                        <Text style={styles.desc}>
                            test
                        </Text>

                        <Text style={styles.price}>
                            {item.price}
                        </Text>
                    </View>
                    <View style = {styles.buy}>
                    <BuyButton text= "buy" onPress={() => buy("placeholder")} />
                    </View>
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
        backgroundColor: color.gold,
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

export default Friends;