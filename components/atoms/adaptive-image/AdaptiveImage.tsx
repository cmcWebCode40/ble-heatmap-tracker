import { Image, ImageProps } from 'expo-image';
import React from 'react';

const blurHash = {
  dark: 'L04.9=j[ayj[xufQfQfQRjayayay',
  light: 'LYNwNDaKkDWB_4bbe-t6IAoLWXWB',
};

interface AdaptiveImageProps extends ImageProps {
  classNames?: string;
}

export const AdaptiveImage: React.FunctionComponent<AdaptiveImageProps> = ({
  style,
  classNames,
  ...otherImageProps
}) => {
  return (
    <Image style={style} className={classNames} placeholder={blurHash.light} {...otherImageProps} />
  );
};

export default AdaptiveImage;
