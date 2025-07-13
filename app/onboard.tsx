import { Button } from "@/components/atoms";
import { useUserLocation } from "@/hooks/useUserLocation";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const router = useRouter();
  const { location, loading, error, refresh } = useUserLocation();

  return (
    <SafeAreaView className="flex-1 bg-black-100 relative">
      <LinearGradient
        colors={["#1e1e2e", "#000000"]}
        className="absolute inset-0 z-0"
      />
      <TouchableOpacity
        onPress={() => router.push("/scan")}
        className="w-14 h-14 rounded-full ml-6 mt-6  shadow-md bg-white/10 border border-white/20 items-center justify-center"
      >
        <Image
          source={require("../assets/images/Pokemon_Type_Icon_Fire.png")}
          className="w-16 h-16 rounded-full"
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View className="flex-1 z-10 items-center justify-center px-6">
        {loading && <ActivityIndicator size="large" color="#00ffcc" />}

        {!loading && location && (
          <View className="mb-4">
            <Text className="text-white-100 text-lg font-bold">
              Your Coordinates:
            </Text>
            <Text className="text-white-100 mt-1">
              Latitude: {location.latitude}
            </Text>
            <Text className="text-white-100">
              Longitude: {location.longitude}
            </Text>
          </View>
        )}

        {error && <Text className="text-red-500">{error}</Text>}

        <Button onPress={refresh}>Refresh Location</Button>
      </View>

      <View className="absolute bottom-8 right-6 space-y-4 z-20">
        <TouchableOpacity
          onPress={() => router.push("/profile")}
          className="w-14 h-14 rounded-full shadow-md bg-white/10 border border-white/20 items-center justify-center"
        >
          <Image
            source={require("../assets/images/League=Retro Cup.png")}
            className="w-16 h-16 rounded-full"
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/select-character")}
          className="w-14 h-14 my-10 rounded-full shadow-md bg-white/10 border border-white/20 items-center justify-center"
        >
          <Image
            source={require("../assets/images/Pokemon_Type_Icon_Fairy.png")}
            className="w-16 h-16"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
