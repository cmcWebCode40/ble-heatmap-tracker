import { StrippedPeripheral } from "@/types/bluetooth";
import React, { createContext, useContext, useEffect, useState } from "react";
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

type CreateContext = {
  startScan: () => Promise<void>;
  peripherals: any;
  isScanning: boolean;
  discoveredPeripherals: StrippedPeripheral[];
};

export const BluetoothContext = createContext<CreateContext>({
  isScanning: false,
  peripherals: null,
  discoveredPeripherals:[],
  startScan: async () => undefined,
});

const SECONDS_TO_SCAN_FOR = 5;
const SERVICE_UUIDS: string[] = [];
const ALLOW_DUPLICATES = true;

interface BluetoothProviderProps {
  children: React.ReactNode;
}

export const BluetoothProvider: React.FunctionComponent<
  BluetoothProviderProps
> = ({ children }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [peripherals, setPeripherals] = useState(
    new Map<Peripheral["id"], Peripheral>(null)
  );

  const discoveredPeripherals = Array.from(peripherals.values())

  useEffect(() => {

    const listeners: any[] = [
      BleManager.onDiscoverPeripheral(handleDiscoverPeripheral),
      BleManager.onStopScan(handleStopScan),
    ];

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
    console.log("[handleDiscoverPeripheral] new BLE peripheral: ", peripheral);
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
    // if (isScanning) {
      setPeripherals(new Map<Peripheral["id"], Peripheral>());
      try {
        console.debug("[startScan] starting scan...");
        setIsScanning(true);
        await BleManager.scan(SERVICE_UUIDS, SECONDS_TO_SCAN_FOR, ALLOW_DUPLICATES, {
          matchMode: BleScanMatchMode.Sticky,
          scanMode: BleScanMode.LowLatency,
          callbackType: BleScanCallbackType.AllMatches,
        })
        console.debug("[startScan] scan promise returned successfully.");
      } catch (error) {
        console.error("[startScan] ble scan error thrown", error);
      }
    // }
  };

  return (
    <BluetoothContext.Provider
      value={{
        startScan,
        isScanning,
        peripherals,
        discoveredPeripherals
      }}
    >
      {children}
    </BluetoothContext.Provider>
  );
};

export const useBluetooth = () => {
  return useContext(BluetoothContext);
};
