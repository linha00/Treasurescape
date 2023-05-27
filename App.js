import React from 'react';
import { SafeAreaView , StyleSheet , Text} from 'react-native' ;
import { Amplify } from 'aws-amplify';

import Navigation from './routes/homeStack';
import config from './src/aws-exports';

Amplify.configure(config);

const App = () => {
    return (
// username is admin and password is password 
// or you can create a new account 
        <SafeAreaView style={styles.root}>
            <Navigation/> 
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    }
});


export default App;