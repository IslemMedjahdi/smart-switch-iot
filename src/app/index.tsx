import { StyleSheet, Text, View } from "react-native";
import useGetLocalNetworkDevices from "../hooks/useGetLocalNetworkEspDevice";
import AnimatedLoader from "../components/AnimatedLoader";

export default function App() {
  const { espDeviceIp, scanningLoadingProgress, error } =
    useGetLocalNetworkDevices();

  return (
    <View style={styles.container}>
      {scanningLoadingProgress !== 100 ? (
        <AnimatedLoader percentage={scanningLoadingProgress} />
      ) : espDeviceIp ? (
        <View>
          <Text>Found ESP device at: {espDeviceIp}</Text>
        </View>
      ) : (
        <Text>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
