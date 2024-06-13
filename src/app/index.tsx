import { StyleSheet, Text, View } from "react-native";
import useGetLocalNetworkDevices from "../hooks/useGetLocalNetworkEspDevice";
import DevicesList from "./Devices";
import AnimatedLoader from "../components/AnimatedLoader";
import React, { useState, useEffect } from "react";

import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });
  const { espDeviceIp, scanningLoadingProgress, error } =
    useGetLocalNetworkDevices();

  return (
    <View style={styles.container}>
      {scanningLoadingProgress !== 100 || !fontsLoaded ? (
        <AnimatedLoader percentage={scanningLoadingProgress} />
      ) : espDeviceIp ? (
        <View
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#2884ec",
            opacity: 0.9,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              paddingTop: "10%",
              paddingHorizontal: "5%",
            }}
          >
            <Text
              style={{
                color: "#e6e7e8",
                fontFamily: "Poppins_500Medium",
                fontSize: 18,
              }}
            >
              Smart Home Control
            </Text>
            <View
              style={{
                height: 3,
                width: "40%",
                backgroundColor: "#e6e7e8",
                borderRadius: 10,
                opacity: 0.5,
              }}
            ></View>
          </View>
          <DevicesList espIp={espDeviceIp} />
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
