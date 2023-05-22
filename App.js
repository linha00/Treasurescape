import React from 'react';
import { TouchableWithoutFeedback , Keyboard } from 'react-native';

import StartScreen from './app/pages/StartScreen';
import LoginScreen from './app/pages/LoginScreen';
import SignUp from './app/pages/SignUp';
import HomePage from './app/pages/HomePage';
import MissionPage from './app/pages/MissionPage';
import ShopPage from './app/pages/ShopPage';

export default function App() {

    const press = () => {
        Keyboard.dismiss();
        console.log('dismissed keyboard');
    }
    
    return (
        <TouchableWithoutFeedback onPress={press}>
            {/* change this */}
            {/*==>*/ <ShopPage/> /*<==*/}
        </TouchableWithoutFeedback>
    )
}