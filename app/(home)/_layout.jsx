import { Tabs } from "expo-router"
import color from "../../config/colors";

export default function AuthLayout() {
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
            <Tabs.Screen name ="home"/>
            <Tabs.Screen name ="mission"/>
            <Tabs.Screen name ="map"/>
            <Tabs.Screen name ="friends"/>
            <Tabs.Screen name ="shop"/>
        </Tabs>
    );
}

