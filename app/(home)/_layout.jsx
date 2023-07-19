import { Stack } from "expo-router"

export default function MissionLayout() {
    return (
        <Stack>
            <Stack.Screen name ="mission" options={{ headerShown: false}}/>
            <Stack.Screen name ="cameraScreen"/>
        </Stack>
    );
}

