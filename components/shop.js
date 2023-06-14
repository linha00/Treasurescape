import { useEffect, useState } from 'react';
import { StyleSheet , Text , View, FlatList , Dimensions, Image } from 'react-native';
import color from '../config/colors'

import { supabase } from '../lib/supabase';
import AppLoader from './AppLoader';
import CustomButton from './customButton';

const windowWidth = Dimensions.get('window').width;
const componentWidth = (windowWidth / 3) - 30;
const componentHeight = componentWidth * 1.5;

function Shop() {
    const [loading, setLoading] = useState(false);
    const [items, setItem] = useState([
        {name: 'Temp', image:"tempUrl", price: 1000, key: '1'},
    ]);
    
    useEffect(() => {
        async function getItems() {
            setLoading(true);
            let {data} = await supabase.from('shop').select();
            setItem(data);
            setLoading(false);
        }
        getItems();
    }, []);

    const buy = (name) => {
        console.log('buy ' + name);
    }

    return (
        <>
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
                        <CustomButton type="buy" text= "buy" onPress={() => buy(item.name)} />
                        </View>
                    </View>
                    )}/>
            </View>
            {loading ? <AppLoader /> : null }
        </>
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