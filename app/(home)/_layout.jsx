import { Tabs } from "expo-router"

export default function AuthLayout() {
    return (
        <Tabs screenOptions={{headerShown: false}}>
            <Tabs.Screen name ="home" />
            <Tabs.Screen name ="mission" />
            <Tabs.Screen name ="map" />
            <Tabs.Screen name ="friends" />
            <Tabs.Screen name ="shop" />
        </Tabs>

    );
}

