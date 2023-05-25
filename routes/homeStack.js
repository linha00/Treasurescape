import React , {useEffect, useState} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Auth , Hub } from 'aws-amplify';
import { ActivityIndicator, View } from 'react-native';

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
    // const [user, setUser] = useState(undefined);

    // const checkUser = async () => {
    //     try {
    //         const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
    //         setUser(authUser);
    //     } catch (e) {
    //         setUser(null);
    //     }
    // }

    // useEffect(() => {
    //     checkUser();
    // }, []);

    // useEffect(() => {
    //     const listener = (data) => {
    //         if (data.payload.event == 'signIn' || data.payload.event == 'signOut') {
    //             checkUser();
    //         }
    //     }

    //     Hub.listen('auth', listener);
    //     return () => Hub.remove('auth', listener);
    // }, [])

    // if (user == undefined) {
    //     return (
    //         <View style = {{flex: 1, justifyContent: "center", alignItems: "center"}}>
    //             <ActivityIndicator/>
    //         </View>
    //     );
    // }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {/* {user ? (
                    <> */}
                        <Stack.Screen name="Login" component={LoginPage} />
                        <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} />
                        <Stack.Screen name="CodeVerification" component={CodeVerification} />
                        <Stack.Screen name="ResetPassword" component={ResetPassword} />
                        <Stack.Screen name="Signup" component={SignupPage} />
                    {/* </>
                ) : (
                    <> */}
                        <Stack.Screen name="Home" component={HomePage} />
                        <Stack.Screen name="Mission" component={MissionPage} />
                        <Stack.Screen name="Shop" component={ShopPage} />
                        <Stack.Screen name="Map" component={MapPage} />
                        <Stack.Screen name="Friends" component={FriendsPage} />
                    {/* </>
                )} */}

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;