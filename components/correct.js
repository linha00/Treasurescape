import { View, Text, StyleSheet, Model } from "react-native";

const Correct = () => {
    return (
        <Model
            transparent = {true}
            visible = {true}
        >
            <View style = { styles.container}>
                <Text>asd</Text>
            </View>
        </Model>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },

})

export default Correct;