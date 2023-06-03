import { useEffect, useState } from 'react';
import { StyleSheet , Text , View, FlatList , Dimensions, Image } from 'react-native';
import color from '../config/colors'

import BuyButton from './buyButton';
import { supabase } from '../lib/supabase';

const windowWidth = Dimensions.get('window').width;
const componentWidth = (windowWidth / 3) - 30;
const componentHeight = componentWidth * 1.5;

function Shop() {

    const [items, setItem] = useState([
        {name: 'Temp', image:"tempUrl", price: 1000, key: '1'},
    ]);

    useEffect(() => {
        async function getItems() {
            let {data} = await supabase.from('shop').select();
            setItem(data);
        }
        getItems();
    }, []);

    const buy = (name) => {
        console.log('buy ' + name);
    }

    return (
        <View style={styles.container}>
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

export default Shop;