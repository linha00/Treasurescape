import { Tabs } from "expo-router"
import { Image, Dimensions } from 'react-native';
import color from "../../config/colors";

const logo = Dimensions.get('window').width / 16;

export default function HomeLayout() {
    return (
        <Tabs 
            initialRouteName="home"
            screenOptions={{
                headerShown: false,
                tabBarActiveBackgroundColor: color.primary,
                tabBarLabelStyle: {
                    fontSize: 15,
                    color: color.black,
                    top: -2
                },
                tabBarStyle: {
                    height: 70,
                },
            }} 
        >
            <Tabs.Screen 
                name ="home"
                options={{
                    tabBarIcon: () => <Image
                        style={{ width: logo, height: logo}}
                        source={require("../../assets/home.png")}
                    />
                }}
            />

            <Tabs.Screen 
                name ="mission"
                options={{
                    tabBarIcon: () => <Image
                        style={{ width: logo, height: logo}}
                        source={require("../../assets/missions.png")}
                    />
                }}
            />

            <Tabs.Screen 
                name ="map"
                options={{
                    tabBarIcon: () => <Image
                        style={{ width: logo, height: logo}}
                        source={require("../../assets/map.png")}
                    />
                }}
            />

            <Tabs.Screen 
                name ="friends"
                options={{
                    tabBarIcon: () => <Image
                        style={{ width: logo, height: logo}}
                        source={require("../../assets/friends.png")}
                    />
                }}
            />

            <Tabs.Screen 
                name ="shop"
                options={{
                    tabBarIcon: () => <Image
                        style={{ width: logo, height: logo}}
                        source={require("../../assets/shop.png")}
                    />
                }}
            />

        </Tabs>
    );
}

