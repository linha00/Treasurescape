import {StyleSheet, SafeAreaView, Text} from 'react-native';

import ProfileButton from '../../components/profileButton';

function MapPage() {

    return (
        <SafeAreaView style={styles.container}>
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