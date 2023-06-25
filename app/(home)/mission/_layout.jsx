import { Stack, Tabs } from "expo-router"
import { Image, Dimensions } from 'react-native';

const logo = Dimensions.get('window').width / 16;

function LogoTitle() {
    return (
        <Image
            style={{ width: logo, height: logo}}
            source={require("../../../assets/missions.png")}
        />
    );
  }

export default function MissionLayout() {
    return (
        <>
            <Tabs.Screen 
                options={{
                    tabBarIcon: () => <LogoTitle />
                }}
            />
            <Stack>
                <Stack.Screen name ="mission" options={{ headerShown: false}}/>
                <Stack.Screen name ="cameraScreen"/>
            </Stack>
        </>
    );
}

