import React from "react";
import useGetEspDevices from "../hooks/useGetEspDevices";
import { Text } from "react-native";

const DevicesList = ({ espIp }: { espIp: string }) => {
  const { devices, loading } = useGetEspDevices({
    espIp,
  });
  return (
    <Text>
      {loading
        ? "Loading..."
        : devices.map((device) => (
            <Text key={device.pin}>
              {device.name} - {device.status}
            </Text>
          ))}
    </Text>
  );
};

export default DevicesList;
