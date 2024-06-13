import React, { useEffect } from "react";
import { Device, EspService } from "../core/EspService";
import { delay } from "../utils/delay";

type IUseGetEspDevices = {
  devices: Device[];
  loading: boolean;
  error: string | null;
  toggleDeviceStatus: (pin: string) => void;
  renameDevice: (pin: string, name: string) => void;
};

const useGetEspDevices = ({ espIp }: { espIp: string }): IUseGetEspDevices => {
  const [devices, setDevices] = React.useState<Device[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchDevices = async () => {
    setLoading(true);
    setError(null);
    try {
      const devices = await EspService.getDevices(espIp);
      setDevices(devices);
    } catch (e) {
      if (e instanceof Error) {
        return setError(e.message);
      }
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    delay(1000).then(() => {
      fetchDevices();
    });
  }, []);

  const toggleDeviceStatus = async (pin: string) => {
    try {
      await EspService.toggleDeviceStatus(espIp, pin);
      fetchDevices();
    } catch (e) {
      if (e instanceof Error) {
        return setError(e.message);
      }
      setError("An error occurred");
    }
  };

  const renameDevice = async (pin: string, name: string) => {
    try {
      await EspService.renameDevice(espIp, pin, name);
      fetchDevices();
    } catch (e) {
      if (e instanceof Error) {
        return setError(e.message);
      }
      setError("An error occurred");
    }
  };

  return {
    devices,
    loading,
    error,
    toggleDeviceStatus,
    renameDevice,
  };
};

export default useGetEspDevices;
