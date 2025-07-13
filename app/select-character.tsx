import { AdaptiveImage, Button } from '@/components/atoms';
import { ChevronLeft } from '@/components/icons';
import { screenWidth } from '@/utils';
import { GAME_CHARACTER, mmkvStorage } from '@/utils/MMKVStorage';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ColorValue,
  ImageSourcePropType,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';


const cardSize = (screenWidth - 72) / 2;

interface Pokemon {
  id: string;
  name: string;
  image?: ImageSourcePropType;
  backgroundColor: readonly [ColorValue, ColorValue, ...ColorValue[]];
  unlocked: boolean;
}

interface PokemonCardProps {
  pokemon: Pokemon;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const CharacterSelectScreen: React.FC = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const pokemonList: Pokemon[] = [
    {
      id: 'charizard',
      name: 'Charizard',
      backgroundColor: ['#FFA500', '#FF6347'],
      unlocked: true,
      image: require('../assets/images/charizard.png'),
    },
    {
      id: 'bulbasaur',
      name: 'Bulbasaur',
      backgroundColor: ['#90EE90', '#228B22'],
      unlocked: true,
      image: require('../assets/images/bulbasaur.png'),
    },
  ];

  const handleSelect = (pokemonId: string) => {
    const pokemon = pokemonList.find(p => p.id === pokemonId);
    if (pokemon) {
      setSelectedPokemon(pokemon);
    }
  };

  const saveCharacter = ()=>{
    mmkvStorage.setItem(GAME_CHARACTER, selectedPokemon)
    router.push('/onboard')
  }

  const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, isSelected, onSelect }) => {
    return (
      <TouchableOpacity
        onPress={() => onSelect(pokemon.id)}
        activeOpacity={pokemon.unlocked ? 0.8 : 1}
        className="w-[48%] mb-4 rounded-2xl"
      >
        <LinearGradient
          className={
            `rounded-3xl p-4 items-center justify-center shadow-md bg-white-100
            ${isSelected ? 'border-4 border-white-100' : 'border border-transparent'}
          `}
          style={{
            width: cardSize,
            height: cardSize + 30,
            borderRadius: 20,
            borderWidth:isSelected ? 2:0,
            borderColor:isSelected ? 'white':'none',
          }}
          colors={pokemon.backgroundColor}
        >
          <AdaptiveImage
            source={pokemon.image}
            style={{ width: cardSize * 0.8, height: cardSize * 0.8, margin:'auto', }}
            contentFit="contain"
          />
          <Text className="mt-3 text-white-100 text-center font-semibold text-lg mb-4">
            {pokemon.unlocked ? pokemon.name :  'Locked'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-black-100">
      <View className={`px-6 ${Platform.OS === 'ios' ? 'pt-12' : 'pt-8'}`}>
        <TouchableOpacity
          className="flex-row items-center py-5"
          onPress={() => router.back()}
        >
            <ChevronLeft color="#333" size={40} />
        </TouchableOpacity>
      </View>

      <View className="px-6 mb-6">
        <Text className="text-white-100 text-lg font-light">Select Your</Text>
        <View className="flex-row items-center">
          <Text className="text-white-100 text-5xl font-bold">BlueMon</Text>
          <View className="ml-3">
            <Text className="text-4xl animate-bounce">🔴⚪</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}>
        <View className="flex-row flex-wrap justify-between">
          {pokemonList.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              isSelected={selectedPokemon?.id === pokemon.id}
              onSelect={handleSelect}
            />
          ))}
        </View>
      </ScrollView>
      {selectedPokemon && (
        <View className="absolute bottom-10 left-0  right-0 p-6 bg-black/60">
          <Button
            onPress={saveCharacter}
            className="bg-blue-600 py-4 rounded-full items-center shadow-lg"
          >
            Continue with {selectedPokemon?.name}
          </Button>
        </View>
      )}
    </View>
  );
};

export default CharacterSelectScreen;
