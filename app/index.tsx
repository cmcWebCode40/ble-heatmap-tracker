import { AdaptiveImage, Button } from "@/components/atoms";
import { colors } from "@/constants";
import { screenHeight } from "@/utils";
import { GAME_CHARACTER, mmkvStorage } from "@/utils/MMKVStorage";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BallGrey from "../assets/images/ball_grey.png";
import PokemonFullImage from "../assets/images/pokemon_char.png";

const WelcomeScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const checkForExistingCharacter = () => {
    try {
      setIsLoading(true);
      const response = mmkvStorage.getItem(GAME_CHARACTER);
      if (response) {
        router.replace("/onboard");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkForExistingCharacter();
  }, []);

  if (isLoading) {
    return (
      <View className="bg-black-100 flex-1 justify-center items-center">
        <ActivityIndicator size={"large"} color={colors.dark.orange[100]} />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black-100 relative justify-between items-center">
      <ImageBackground
        source={BallGrey}
        contentFit="cover"
        className="h-10 w-10"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.08,
        }}
      />
      <View className="pt-20">
        <Text className="text-5xl font-extrabold text-white-100 tracking-wider text-center">
          BlueMon
        </Text>
        <Text className="text-white-100/60 text-center text-sm mt-2">
          Discover. Catch. Explore.
        </Text>
      </View>

      <View className="flex-1 items-center justify-center">
        <AdaptiveImage
          source={PokemonFullImage}
          contentFit="contain"
          style={{
            width: 400,
            height: screenHeight * 0.55,
          }}
        />
      </View>

      <View className="w-full px-6 pb-14">
        <Button
          onPress={() => router.push("/select-character")}
          className="bg-blue-600 py-4 rounded-full shadow-xl"
        >
          Start Viewing
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
