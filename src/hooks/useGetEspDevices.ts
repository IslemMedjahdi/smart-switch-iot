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
      EspService.toggleDeviceStatus(espIp, pin)
        .then(() => {
          console.log("Toggled device status");
          fetchDevices();
        })
        .catch((e) => {
          if (e instanceof Error) {
            console.log(e.message);
            return setError(e.message);
          }
          setError("An error occurred");
        });
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        return setError(e.message);
      }
      setError("An error occurred");
    }
  };

  const renameDevice = async (pin: string, name: string) => {
    try {
      EspService.renameDevice(espIp, pin, name).then(() => {
        console.log("Renamed device");
        fetchDevices();
      });
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
