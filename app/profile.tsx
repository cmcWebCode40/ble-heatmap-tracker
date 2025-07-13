import { Button } from "@/components/atoms";
import { ChevronLeft } from "@/components/icons";
import { Pokemon } from "@/types/bluetooth";
import { screenWidth } from "@/utils";
import { GAME_CHARACTER, mmkvStorage } from "@/utils/MMKVStorage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const cardSize = screenWidth * 0.6;

export const characterImages: Record<string, any> = {
  charizard: require("../assets/images/charizard.png"),
  bulbasaur: require("../assets/images/bulbasaur.png"),
};

const ProfileScreen = () => {
  const collectedSignals = 0;
  const profile = mmkvStorage.getItem<Pokemon>(GAME_CHARACTER);

  const selectedCharacter: any = {
    name: profile?.name,
    image: profile?.id ? characterImages[profile?.id] : "",
    colors: profile?.backgroundColor,
  };

  const reset = () => {
    mmkvStorage.deleteItemById(GAME_CHARACTER);
    router.replace("/select-character");
  };
  return (
    <SafeAreaView className="flex-1 bg-black-100">
      <View className={`px-2 ${Platform.OS === "ios" ? "pt-4" : "pt-8"}`}>
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => router.back()}
        >
          <ChevronLeft color="#333" size={40} />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        className="px-6 pt-4"
      >
        <Text className="text-white-100 text-3xl font-bold text-center mb-2">
          Trainer Profile
        </Text>
        <Text className="text-white-100 text-center opacity-80 text-base mb-6">
          Offline Explorer Mode
        </Text>
        <LinearGradient
          colors={selectedCharacter.colors}
          className="rounded-3xl p-4 items-center justify-center shadow-lg mx-auto"
          style={{
            width: cardSize,
            height: cardSize + 30,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 24,
            marginHorizontal: "auto",
          }}
        >
          <Image
            source={selectedCharacter.image}
            className="w-full h-full"
            resizeMode="contain"
          />
        </LinearGradient>

        <Text className="text-white-100 text-2xl font-bold text-center mt-4">
          {selectedCharacter.name}
        </Text>

        <View className="mt-10 bg-gray-900/60 p-6 rounded-2xl border border-gray-700">
          <Text className="text-white-100 text-lg font-semibold mb-4">
            Activity Summary
          </Text>

          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white-100">Signals Collected</Text>
            <Text className="text-yellow-100 font-bold text-xl">
              {collectedSignals}
            </Text>
          </View>

          <View className="flex-row justify-between items-center">
            <Text className="text-white-100">Exploration Progress</Text>
            <Text className="text-yellow-100 font-bold">0%</Text>
          </View>
        </View>

        <Text className="text-white-100/70 text-center text-sm mt-6">
          RSSI signals are collected from nearby Bluetooth devices as you move.
        </Text>
        <Button onPress={reset} className="mt-5">
          Reset
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
