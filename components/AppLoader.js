import { View, StyleSheet } from "react-native";

import LottieView from 'lottie-react-native';
import colors from "../config/colors";

const AppLoader = () => {
    return (
        <View style = {[StyleSheet.absoluteFillObject, styles.container]}>
            <LottieView style = {{width: 200, height: 200}} source={require('../assets/loader.json')} autoPlay loop/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        zIndex: 1,
    },
})

export default AppLoader;