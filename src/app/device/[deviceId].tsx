import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

const devicePage = () => {
  const { slug } = useLocalSearchParams();
  return <Text>devicePage : {slug}</Text>;
};

export default devicePage;
