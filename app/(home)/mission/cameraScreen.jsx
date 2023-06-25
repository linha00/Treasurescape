import * as React from "react";
import { useRef } from "react";
import { StyleSheet, View , Text} from "react-native";

export default function CameraScreen({ onCapture }) {
  const cameraRef = useRef(null);
  return (
    // <Camera
    //   ref={cameraRef}
    //   style={styles.camera}
    //   onCapture={onCapture}
    //   targetResolution={{ width: 1080, height: 1920 }}
    // />
    <View>
      <Text>asd</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: { width: "100%", height: "100%" },
});
