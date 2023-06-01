import {StyleSheet, SafeAreaView, View, Text} from 'react-native';

import TaskBar from '../../components/taskBar';
import SidePanelButton from '../../components/sidePanelButton';
import ProfileButton from '../../components/profileButton';

function MapPage() {

    return (
        <SafeAreaView style={styles.container}>
            <View style = {styles.top}>
                <SidePanelButton/>
                <ProfileButton />
                <Text>map</Text>
            </View>

            <TaskBar style={styles.taskbar}/>
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    top: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

})

export default MapPage;