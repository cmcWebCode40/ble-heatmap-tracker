import * as Linking from 'expo-linking';
import { Share } from 'react-native';

export const openWebUrl = (url: string) => {
  Linking.openURL(url);
};

export const shareInfo = async (message: string) => {
  await Share.share({
    message,
  });
};
