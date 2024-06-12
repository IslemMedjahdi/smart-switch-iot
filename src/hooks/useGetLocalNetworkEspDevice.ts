import React, { useEffect, useState } from "react";
import * as Network from "expo-network";
import { fetchWithTimeout } from "../utils/fetch-with-timeout";
import { EspService } from "../core/EspService";

type IUseGetLocalNetworkDevices = {
  espDeviceIp: string | null;
  error: string | null;
  scanningLoadingProgress: number;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const useGetLocalNetworkDevices = (): IUseGetLocalNetworkDevices => {
  const [espDeviceIp, setEspDeviceIp] = useState<string | null>(null);

  const [scanningLoadingProgress, setScanningLoadingProgress] =
    useState<number>(0);

  const [error, setError] = useState<string | null>(null);

  const searchForEspDevice = async () => {
    setScanningLoadingProgress(0);
    setError(null);
    try {
      const deviceIpAddress = await getDeviceIpAddress();
      const ipBase = getIpBase(deviceIpAddress);
      for (let i = 0; i < 255; i++) {
        const ip = `${ipBase}.130`; // EDIT THIS
        if (await isEspDevice(ip)) {
          setEspDeviceIp(ip);
          setScanningLoadingProgress(100);
          return;
        }
        setScanningLoadingProgress((prev) => prev + 100 / 255);
        await delay(100);
      }
      setScanningLoadingProgress(100);
      throw new Error("No ESP device detected on the network");
    } catch (e) {
      if (e instanceof Error) {
        return setError(e.message);
      }
      return setError("An error occurred while fetching the IP address");
    }
  };

  const getDeviceIpAddress = async (): Promise<string> => {
    return await Network.getIpAddressAsync();
  };

  const getIpBase = (ip: string): string => {
    const ipParts = ip.split(".");
    return ipParts.slice(0, 3).join(".");
  };

  const isEspDevice = async (ip: string): Promise<boolean> => {
    try {
      const response = await fetchWithTimeout(`http://${ip}/identify`);

      const data = await response.text();

      if (data.includes("ESP")) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    searchForEspDevice();
  }, []);

  return {
    espDeviceIp,
    scanningLoadingProgress,
    error,
  };
};

export default useGetLocalNetworkDevices;
