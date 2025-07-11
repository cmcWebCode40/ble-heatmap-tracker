import { handleAndroidPermissions } from "@/utils/permission";
import React, { createContext, useEffect, useState } from "react";
import { Alert, Linking, Platform } from "react-native";
import BleManager, {
    BleScanCallbackType,
    BleScanMatchMode,
    BleScanMode,
    Peripheral,
} from "react-native-ble-manager";

declare module "react-native-ble-manager" {
  interface Peripheral {
    connected?: boolean;
    connecting?: boolean;
  }
}

export const BluetoothContext = createContext({});

const SECONDS_TO_SCAN_FOR = 5;
const SERVICE_UUIDS: string[] = [];
const ALLOW_DUPLICATES = true;


interface BluetoothProviderProps {
    children:React.ReactNode
}

export const BluetoothProvider:React.FunctionComponent<BluetoothProviderProps> = ({ children }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [peripherals, setPeripherals] = useState(
    new Map<Peripheral["id"], Peripheral>()
  );

  useEffect(() => {
    BleManager.start({ showAlert: false })
      .then(() => console.debug("BleManager started."))
      .catch((error: any) =>
        console.error("BeManager could not be started.", error)
      );

    const listeners: any[] = [
      BleManager.onDiscoverPeripheral(handleDiscoverPeripheral),
      BleManager.onStopScan(handleStopScan),
    ];

    handleAndroidPermissions();

    return () => {
      for (const listener of listeners) {
        listener.remove();
      }
    };
  }, []);

  const handleStopScan = () => {
    setIsScanning(false);
    console.debug("[handleStopScan] scan is stopped.");
  };

  const handleDiscoverPeripheral = (peripheral: Peripheral) => {
    console.debug("[handleDiscoverPeripheral] new BLE peripheral=", peripheral);
    if (!peripheral.name) {
      peripheral.name = "NO NAME";
    }
    setPeripherals((map) => {
      return new Map(map.set(peripheral.id, peripheral));
    });
  };

  const enableBluetooth = async () => {
    try {
      console.debug("[enableBluetooth]");
      await BleManager.enableBluetooth();
    } catch (error) {
      console.error("[enableBluetooth] thrown", error);
    }
  };

  const startScan = async () => {
    const state = await BleManager.checkState();
    console.log(state);
    if (state === "off") {
      if (Platform.OS === "ios") {
        Alert.alert(
          "Enable Bluetooth",
          "Please enable Bluetooth in Settings to continue.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Open Settings",
              onPress: () => {
                Linking.openURL("App-Prefs:Bluetooth");
              },
            },
          ]
        );
      } else {
        enableBluetooth();
      }
    }
    if (!isScanning) {
      setPeripherals(new Map<Peripheral["id"], Peripheral>());
      try {
        console.debug("[startScan] starting scan...");
        setIsScanning(true);
        BleManager.scan(SERVICE_UUIDS, SECONDS_TO_SCAN_FOR, ALLOW_DUPLICATES, {
          matchMode: BleScanMatchMode.Sticky,
          scanMode: BleScanMode.LowLatency,
          callbackType: BleScanCallbackType.AllMatches,
        })
          .then(() => {
            console.debug("[startScan] scan promise returned successfully.");
          })
          .catch((err: any) => {
            console.error("[startScan] ble scan returned in error", err);
          });
      } catch (error) {
        console.error("[startScan] ble scan error thrown", error);
      }
    }
  };

  return (
    <BluetoothContext.Provider value={{}}>{children}</BluetoothContext.Provider>
  );
};
