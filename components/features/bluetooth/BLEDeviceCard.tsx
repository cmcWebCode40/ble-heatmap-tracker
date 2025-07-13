import { getRandomColorFromPalette } from '@/utils/colorsUtils';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type BLEDevice = {
  id: string;
  name?: string;
  rssi: number;
  localName?: string;
};

interface BLECardProps {
  device: BLEDevice;
}

const getInitials = (name =''): string => {
  if (!name) return '?';
  return name.slice(0, 2).toUpperCase();
};

const getRSSIEmoji = (rssi: number): string => {
  if (rssi >= -50) return '💚';
  if (rssi >= -70) return '🟡';
  return '🔴';
};

const BLEDeviceCard: React.FC<BLECardProps> = ({ device }) => {
  const avatarColor = getRandomColorFromPalette(device?.id);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      className="bg-[#101113] border border-[#6B6B6B] rounded-2xl p-4 mb-3 mx-4 flex-row items-center shadow-md"
    >
      <View
        className="w-12 h-12 rounded-full items-center justify-center mr-4 opacity-80"
        style={{ backgroundColor: avatarColor }}
      >
        <Text className="text-white-100 text-base font-bold">
          {getInitials(device.name)}
        </Text>
      </View>
      <View className="flex-1">
        <Text className="text-gray-100 font-semibold text-sm">
          {device.name || 'Unknown Device'}
        </Text>
        <Text className="text-gray-100  text-xs mt-2">RSSI: {device.rssi}</Text>
        <Text className="text-gray-100  text-xs mt-1">MAC: {device.id || 'N/A'}</Text>
      </View>
      <View className="ml-2">
        <Text className="text-2xl">{getRSSIEmoji(device.rssi)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BLEDeviceCard;
