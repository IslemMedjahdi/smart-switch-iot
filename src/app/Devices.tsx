import React from "react";
import useGetEspDevices from "../hooks/useGetEspDevices";
import { ScrollView, Switch, Text, View } from "react-native";
import { DeviceStatus } from "../core/EspService";

const DevicesList = ({ espIp }: { espIp: string }) => {
  const { devices, loading } = useGetEspDevices({
    espIp,
  });
  return (
    <ScrollView
      style={{
        gap: 10,
        width: "100%",
      }}
    >
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        devices.map((device, index) => (
          <>
            <View
              style={{
                padding: 10,
                margin: 10,
                borderRadius: 5,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              key={device.pin}
            >
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 24,
                  color: "white",
                }}
              >
                {device.name}
              </Text>
              <Switch
                style={{
                  transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
                }}
                trackColor={{
                  false: "rgba(255,0,0,0.9)",
                  true: "rgba(0,255,0,0.9)",
                }}
                thumbColor={"white"}
                value={device.status === DeviceStatus.HIGH}
              />
            </View>
            {index !== devices.length - 1 ? (
              <View
                style={{
                  height: 2,
                  width: "100%",
                  backgroundColor: "white",
                  opacity: 0.5,
                }}
              />
            ) : null}
          </>
        ))
      )}
    </ScrollView>
  );
};

export default DevicesList;
