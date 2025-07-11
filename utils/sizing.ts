import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const BASE_WIDTH_SCALE = SCREEN_WIDTH / 550;
const BASE_HEIGHT_SCALE = SCREEN_HEIGHT / 812;
const TABLET_SCREEN_WIDTH = Platform.OS === 'ios' ? 700 : 800;

const normalize = (size: number, scaleType: 'width' | 'height') => {
  const baseScale = scaleType === 'height' ? BASE_HEIGHT_SCALE : BASE_WIDTH_SCALE;
  return Math.round(PixelRatio.roundToNearestPixel(size * baseScale));
};

const widthPixel = (size: number) => normalize(size, 'width');
const heightPixel = (size: number) => normalize(size, 'height');
const fontPixel = (size: number) => heightPixel(size);
const pixelSizeVertical = (size: number) => heightPixel(size);
const pixelSizeHorizontal = (size: number) => widthPixel(size);

const isTabletScreenWidth = SCREEN_WIDTH >= TABLET_SCREEN_WIDTH;

export const createHitSlop = (value: number) => ({
  top: value,
  bottom: value,
  left: value,
  right: value,
});

export {
  SCREEN_WIDTH as screenWidth,
  SCREEN_HEIGHT as screenHeight,
  isTabletScreenWidth,
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
};
