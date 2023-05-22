import React, { useState } from 'react';
import { StyleSheet , Text , View, SafeAreaView } from 'react-native';
import color from '../config/colors'

import TaskBar from '../components/TaskBar';
import SidePanelButton from '../components/SidePanelButton';
import ProfileButton from '../components/ProfileButton';

function Shop(props) {
    const [items, setItem] = useState([
        {name: 'NUS Dri-fit Shirt', image:"placeholder  ", key: '1'},
    ]);

    return (
        <View style={styles.container}>
            { items.map((item) => {
                return (
                    <View style={styles.box} key={item.key}>
                        <Text style={styles.image}>
                            {item.image}
                        </Text>

                        <Text style={styles.text}>
                            {item.name}
                        </Text>
                    </View>
                )
            })}
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
        // alignContent: 'flex-start',
        // justifyContent: 'space-evenly',
    },

})

export default Shop;