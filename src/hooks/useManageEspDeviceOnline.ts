import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Device } from "../core/EspService";
import { initializeApp } from "firebase/app";
import database from "@react-native-firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDWz4Ysnd05CnWTF8p-WedgWqeuEeoc-gw",
  authDomain: "smart-home-sci-project.firebaseapp.com",
  databaseURL: "https://smart-home-sci-project-default-rtdb.firebaseio.com",
  projectId: "smart-home-sci-project",
  storageBucket: "smart-home-sci-project.appspot.com",
  messagingSenderId: "1053621026574",
  appId: "1:1053621026574:web:e34b436720e6664ba4615f",
};

const app = initializeApp(firebaseConfig);

const useManageEspDeviceOnline = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  const [espDeviceId, setEspDeviceId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getEspDeviceId = async () => {
    try {
      const id = await SecureStore.getItemAsync("LAST_ESP_DEVICE");
      if (id) {
        setEspDeviceId(id);
      } else {
        throw new Error("No ESP device ID found");
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An error occurred while fetching the ESP device ID");
      }
    }
  };

  useEffect(() => {
    if (!espDeviceId) {
      const onValueChange = database()
        .ref(`/devices/${espDeviceId}`)
        .on("value", (snapshot) => {
          console.log("User data: ", snapshot.val());
        });

      return () =>
        database().ref(`/devices/${espDeviceId}`).off("value", onValueChange);
    }
  }, [espDeviceId]);

  const getDevices = async () => {
    setLoading(true);

    setLoading(false);
  };

  useEffect(() => {
    if (espDeviceId) {
      getDevices();
    }
  }, [espDeviceId]);

  return {
    devices,
    error,
    loading,
  };
};
