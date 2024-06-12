import { StyleSheet, Text, View } from "react-native";
import useGetLocalNetworkDevices from "../hooks/useGetLocalNetworkEspDevice";

export default function App() {
  const { espDeviceIp, scanningLoadingProgress, error } =
    useGetLocalNetworkDevices();

  return (
    <View style={styles.container}>
      {scanningLoadingProgress !== 100 ? (
        <Text>Scanning... {scanningLoadingProgress}</Text>
      ) : espDeviceIp ? (
        <Text>Found ESP device at: {espDeviceIp}</Text>
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
