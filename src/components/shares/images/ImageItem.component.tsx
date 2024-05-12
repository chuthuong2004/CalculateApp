import {StoreImage} from '@/types/entities';
import {AppVectorIcons} from '@components/shares/icons';
import {BASE_URL} from '@config/baseUrl';
import {useTheme} from '@react-navigation/native';
import {SHADOW_STYLE} from '@styles/shadow.style';
import {ICON} from '@utils/constants';
import React, {memo} from 'react';
import {Image, Pressable, View} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {hp} from '@utils/helpers';

type ImageItemProps = {
  onPressIcon?: (asset: Asset | StoreImage, index?: number) => void;
  asset: Asset | StoreImage;
  index?: number;
  size?: number;
};
const ImageItemComponent = ({
  onPressIcon,
  asset,
  index,
  size = hp(10),
}: ImageItemProps) => {
  const {colors} = useTheme();

  return (
    <View>
      <Image
        source={{
          uri:
            typeof asset === 'object'
              ? 'path' in asset
                ? BASE_URL + asset?.path
                : asset.uri
              : '',
        }}
        style={[
          {
            width: size,
            height: size,
            borderRadius: hp(0.8),
          },
        ]}
      />
      <Pressable
        onPress={onPressIcon ? () => onPressIcon(asset, index) : undefined}
        style={[
          {
            position: 'absolute',
            right: hp(-0.5),
            top: hp(-0.5),
            backgroundColor: colors.card,
            borderRadius: 50,
            padding: hp(0.2),
          },
          SHADOW_STYLE.shadowCard,
        ]}>
        <AppVectorIcons
          type="AntDesign"
          name={ICON.AntDesign.close}
          size={hp(1.6)}
        />
      </Pressable>
    </View>
  );
};

export default memo(ImageItemComponent);
