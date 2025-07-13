import { Button } from "@/components/atoms";
import BLEDeviceCard from "@/components/features/bluetooth/BLEDeviceCard";
import { Close } from "@/components/icons";
import { useBluetooth } from "@/contexts/BluetoothContext";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PokemonFullImage from "../assets/images/pokemon_char.png";


const BLEScannerScreen = () => {
  const [isRefetching, setIsRefetching] = useState(false);
  const { startScan, isScanning, discoveredPeripherals } = useBluetooth();

  const handleRefresh = async () => {
    try {
      setIsRefetching(true);
      startScan();
    } finally {
      setIsRefetching(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black-100">
      <ImageBackground
        className="flex-1 opacity-90"
        resizeMode="contain"
        source={PokemonFullImage}
      >
        <View className="px-4 pt-4">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => router.back()}
          >
            <Close size={40} />
          </TouchableOpacity>
        </View>

        <View className="px-4 pt-5 pb-4">
          <Text className="text-white-100 text-2xl font-bold text-center mb-2">
            Nearby Devices
          </Text>
          <Text className="text-white-100/60 text-center text-sm">
            Signals discovered around your location
          </Text>
        </View>

        <FlatList
          data={discoveredPeripherals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BLEDeviceCard device={item} />}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          onRefresh={handleRefresh}
          refreshing={isRefetching}
          ListEmptyComponent={
            <View className="justify-center my-20">
              <Text className="text-center text-white-100 text-sm mt-10 mb-5">
                No devices found yet. Try scanning again.
              </Text>
              <View className="px-6">
                <Button
                  onPress={() => {
                    startScan();
                  }}
                  isLoading={isScanning}
                >
                  {isScanning ? "Scanning..." : "Scan Devices"}
                </Button>
              </View>
            </View>
          }
        />
        {discoveredPeripherals.length > 0 && !isScanning && (
          <View className="absolute bottom-6 left-0 right-0 px-6">
            <Button onPress={handleRefresh} isLoading={isScanning}>
              {isScanning ? "Scanning..." : "Rescan Devices"}
            </Button>
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default BLEScannerScreen;
 