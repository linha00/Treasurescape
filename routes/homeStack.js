import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '../pages/homePage';
import LoginPage from '../pages/loginPage';
import SignupPage from '../pages/signupPage';
import MissionPage from '../pages/missionPage';
import ShopPage from '../pages/shopPage';
import ForgotPasswordPage from '../pages/forgotPasswordPage';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} />
                <Stack.Screen name="Signup" component={SignupPage} />
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="Mission" component={MissionPage} />
                <Stack.Screen name="Shop" component={ShopPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;