import React from 'react';
import { TouchableWithoutFeedback , Keyboard } from 'react-native';

import Navigation from './routes/homeStack';

export default function App() {

    const press = () => {
        Keyboard.dismiss();
        console.log('dismissed keyboard');
    }
    
    return (
        <TouchableWithoutFeedback onPress={press}>
            <Navigation/> 
        </TouchableWithoutFeedback>
    )
}