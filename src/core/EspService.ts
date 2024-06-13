import { fetchWithTimeout } from "../utils/fetch-with-timeout";

export enum DeviceStatus {
  HIGH = 1,
  LOW = 0,
}

export type Device = {
  pin: string;
  name: string;
  status: DeviceStatus;
};

export const EspService = {
  async getDevices(espIp: string): Promise<Device[]> {
    const response = await fetchWithTimeout(`http://${espIp}/devices`, {
      method: "POST",
    });
    const data = await response.json();
    return data;
  },
  async toggleDeviceStatus(espIp: string, pin: string): Promise<void> {
    const response = await fetchWithTimeout(
      `http://${espIp}/toggle?pin=${pin}`,
      {
        method: "POST",
      }
    );
  },
  async renameDevice(espIp: string, pin: string, name: string) {
    const response = await fetchWithTimeout(
      `http://${espIp}/rename?pin=${pin}&name=${name}`,
      {
        method: "POST",
      }
    );
  },
  async getDeviceId(espIp: string): Promise<string> {
    const response = await fetchWithTimeout(`http://${espIp}/id`);
    const data = await response.json();
    return data;
  },
};
