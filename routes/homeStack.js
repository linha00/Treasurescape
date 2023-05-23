import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import StartScreen from '../pages/startScreen';
import HomePage from '../pages/homePage';
import LoginPage from '../pages/loginPage';
import SignupPage from '../pages/signupPage';
import MissionPage from '../pages/missionPage';
import ShopPage from '../pages/shopPage';

const screens = {
    Login: {
        screen: LoginPage
    },
    
    Signup: {
        screen: SignupPage
    },

    Home: {
        screen: HomePage
    },        

    Mission: {
        screen: MissionPage
    },

    Shop: {
        screen: ShopPage
    },
}

const HomeStack = createSwitchNavigator(screens);

export default createAppContainer(HomeStack);