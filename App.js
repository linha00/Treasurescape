import React from 'react';
import { TouchableWithoutFeedback , Keyboard } from 'react-native';

import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';
import HomePage from './pages/homePage';
import MissionPage from './pages/missionPage';
import ShopPage from './pages/shopPage';

import Navigator from './routes/homeStack';

export default function App() {

    const press = () => {
        Keyboard.dismiss();
        console.log('dismissed keyboard');
    }
    
    return (
        <TouchableWithoutFeedback onPress={press}>
            {/* change this */}
            {/*==>*/ <Navigator/> /*<==*/}
        </TouchableWithoutFeedback>
    )
}