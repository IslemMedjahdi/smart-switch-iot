enum DeviceStatus {
  HIGH = 1,
  LOW = 0,
}

type Device = {
  pin: string;
  name: string;
  status: DeviceStatus;
};

const EspService = {
  baseUrl: "",
  async setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
  },
  async getDevices(): Promise<Device[]> {
    const response = await fetch(`${this.baseUrl}/devices`);
    const data = await response.json();
    return data;
  },
  async toggleDeviceStatus(pin: string): Promise<Device> {
    const response = await fetch(`${this.baseUrl}/toggle?pin=${pin}`, {
      method: "POST",
    });
    const data = await response.json();
    return data;
  },
  async renameDevice() {
    const response = await fetch(`${this.baseUrl}`, {
      method: "POST",
    });
    const data = await response.json();
    return data;
  },
  async getDeviceId(): Promise<string> {
    const response = await fetch(`${this.baseUrl}/id`);
    const data = await response.json();
    return data;
  },
};
