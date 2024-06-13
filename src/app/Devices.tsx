import React, { useState } from "react";
import useGetEspDevices from "../hooks/useGetEspDevices";
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { DeviceStatus } from "../core/EspService";

const DevicesList = ({ espIp }: { espIp: string }) => {
  const { devices, loading, toggleDeviceStatus } = useGetEspDevices({
    espIp,
  });
  const [modalVisible, setModalVisible] = useState(Array(100).fill(false));

  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState("");

  return (
    <ScrollView
      style={{
        gap: 10,
        width: "100%",
      }}
    >
      {loading
        ? null
        : devices.map((device, index) => (
            <View key={device.pin}>
              <View
                style={{
                  padding: 10,
                  margin: 10,
                  borderRadius: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisible[index]}
                  onRequestClose={() => {
                    setModalVisible(
                      modalVisible.map((value, i) =>
                        i === index ? false : value
                      )
                    );
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text
                        style={[
                          styles.modalText,
                          {
                            fontFamily: "Poppins_600SemiBold",
                            fontSize: 24,
                            color: "black",
                          },
                        ]}
                      >
                        Rename the device{" "}
                      </Text>
                      <SafeAreaView
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                        }}
                      >
                        <TextInput
                          style={styles.input}
                          onChangeText={onChangeText}
                          placeholder="New name"
                          keyboardType="default"
                        />
                      </SafeAreaView>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          width: "100%",
                          gap: 20,
                          paddingHorizontal: "10%",
                          paddingVertical: 10,
                        }}
                      >
                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() =>
                            setModalVisible(
                              modalVisible.map((value, i) =>
                                i === index ? false : value
                              )
                            )
                          }
                        >
                          <Text style={styles.textStyle}>Rename</Text>
                        </Pressable>
                        <Pressable
                          style={[
                            styles.button,
                            styles.buttonClose,
                            {
                              backgroundColor: "red",
                            },
                          ]}
                          onPress={() =>
                            setModalVisible(
                              modalVisible.map((value, i) =>
                                i === index ? false : value
                              )
                            )
                          }
                        >
                          <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </Modal>
                <Pressable
                  onPress={() =>
                    setModalVisible(
                      modalVisible.map((value, i) =>
                        i === index ? true : value
                      )
                    )
                  }
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
                </Pressable>

                <Switch
                  style={{
                    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
                  }}
                  trackColor={{
                    false: "rgba(255,0,0,0.9)",
                    true: "rgba(0,255,0,0.9)",
                  }}
                  onChange={() => {
                    toggleDeviceStatus(device.pin);
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
            </View>
          ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 8,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: "80%",
  },
});

export default DevicesList;
