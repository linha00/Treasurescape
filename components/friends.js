import { useEffect, useState } from 'react';
import { StyleSheet , Text , View, FlatList , Dimensions, Image } from 'react-native';
import color from '../config/colors'

import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/auth';


const windowWidth = Dimensions.get('window').width;
const componentWidth = (windowWidth / 3) - 30;
const componentHeight = componentWidth * 1.5;

function Friends() {
    const { user } = useAuth();
    const [refresh, setRefresh] = useState(false);
    
    const [list, setList] = useState([]);
    const [items, setItems] = useState([
        {name: 'temp', image:"placeholder", online: true, key: '1'},
    ]);

    async function getItems() {
        let {data} = await supabase.from('profiles').select().eq('id', user.id).single();
        setList(data.friends);
        let out = [];
        if (list != null) {
            for (var i = 0; i < list.length; i++) {
                let {data} = await supabase.from('profiles').select().eq('friend_id', list[i]).single();
                let temp = out;
                out = temp.concat([{name: data.name, image: data.imageUrl, online: data.online, key: i}]);
            }
        }
        setItems(out);
        setRefresh(false);
    }

    useEffect(() => {
        getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (refresh) {
            getItems();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh])


    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={({item}) => (
                <View style={styles.box} key={item.key}>
                    <Image style={styles.image} source = {{ uri : item.image}} />
                    <View style={styles.text}>
                        <Text style={styles.name}>
                            {item.name}
                        </Text>
                        <Text style={styles.desc}>
                            {item.online}
                        </Text>
                    </View>
                </View>
                )}
                refreshing = {refresh}
                onRefresh = {() => setRefresh(true)}
                />
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
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        paddingBottom: 5,
        marginBottom: 10,
        borderBottomWidth: 1,
    },

    image: {
        width: componentWidth,
        height: componentHeight,
        left: 0,
    },

    text: {
        width: componentWidth + 30,
        top: 15,
        left: 20,
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