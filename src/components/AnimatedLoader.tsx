import { View } from "react-native";
import file from "../../assets/Animation-1718228073641.json";
import LottieView from "lottie-react-native";
import { ProgressBar } from "react-native-paper";

export default function AnimatedLoader({ percentage = 0 }) {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <LottieView
        style={{
          height: 200,
          width: 200,
        }}
        source={file}
        loop
        autoPlay
      />
      <ProgressBar
        style={{
          height: 20,
          width: 200,
          borderRadius: 10,
        }}
        progress={percentage / 100}
        color={"#2884ec"}
      />
    </View>
  );
}
