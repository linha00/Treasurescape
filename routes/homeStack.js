import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '../pages/homePage';
import LoginPage from '../pages/loginPage';
import ForgotPasswordPage from '../pages/forgotPasswordPage';
import CodeVerification from '../pages/codeVerification';
import SignupPage from '../pages/signupPage';
import MissionPage from '../pages/missionPage';
import ShopPage from '../pages/shopPage';
import ResetPassword from '../pages/resetPassword';
import MapPage from '../pages/MapPage';
import FriendsPage from '../pages/friendsPage';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} />
                <Stack.Screen name="CodeVerification" component={CodeVerification} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
                <Stack.Screen name="Signup" component={SignupPage} />
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="Mission" component={MissionPage} />
                <Stack.Screen name="Shop" component={ShopPage} />
                <Stack.Screen name="Map" component={MapPage} />
                <Stack.Screen name="Friends" component={FriendsPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;