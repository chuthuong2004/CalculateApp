import {useTheme} from '@react-navigation/native';
import React, {memo} from 'react';
import {Image, ImageSourcePropType} from 'react-native';

type ImageCardProps = {
  source: ImageSourcePropType;
  width: number;
  height: number;
  corner?: boolean;
  border?: boolean;
};
const ImageCardComponent = ({
  source,
  height,
  width,
  border = true,
  corner = true,
}: ImageCardProps) => {
  const {colors} = useTheme();
  return (
    <Image
      source={source}
      style={{
        width,
        height,
        borderRadius: corner ? 6 : 0,
        borderWidth: border ? 1 : 0,
        borderColor: colors.border,
      }}
    />
  );
};

export default memo(ImageCardComponent);
