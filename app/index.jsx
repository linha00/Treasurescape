import { Text, StyleSheet, View, Button } from 'react-native';
import { supabase } from '../lib/supabase';

export default function HomePage() {

    return (
        <View style = {styles.container}>
            <Text>index</Text>
            <Button onPress={() => supabase.auth.signOut()} title='sign out'/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
})