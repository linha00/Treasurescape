import {StyleSheet, SafeAreaView, View, Text} from 'react-native';

import SidePanelButton from '../../components/sidePanelButton';
import ProfileButton from '../../components/profileButton';

function MapPage() {

    return (
        <SafeAreaView style={styles.container}>
            <SidePanelButton/>
            <ProfileButton />
            <Text>map</Text>
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

})

export default MapPage;