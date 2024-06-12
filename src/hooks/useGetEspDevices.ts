import React, { useEffect } from "react";
import { Device, EspService } from "../core/EspService";

type IUseGetEspDevices = {
  devices: Device[];
  loading: boolean;
  error: string | null;
};

const useGetEspDevices = ({ espIp }: { espIp: string }): IUseGetEspDevices => {
  const [devices, setDevices] = React.useState<Device[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchDevices = async () => {
    console.log("ESP IP", espIp);
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
    fetchDevices();
  }, []);

  return {
    devices,
    loading,
    error,
  };
};

export default useGetEspDevices;
