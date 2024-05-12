import {StoreImage} from '@/types/entities';
import {BASE_URL} from '@config/baseUrl';
import {Image} from '@rneui/base';
import {hp} from '@utils/helpers';
import React, {memo} from 'react';
import {Pressable} from 'react-native';
import Animated, {SharedTransition, withSpring} from 'react-native-reanimated';
import {widthPercentageToDP} from 'react-native-responsive-screen';

type RenderImageMessageProps = {
  image: StoreImage;
  totalData: number;
  onPress?: (image: StoreImage) => void;
};
const RenderImageMessageComponent = ({
  image,
  totalData,
  onPress,
}: RenderImageMessageProps) => {
  return (
    <Pressable onPress={onPress ? () => onPress(image) : undefined}>
      <Animated.Image
        // sharedTransitionTag={image._id}
        // sharedTransitionStyle={transition}
        source={{
          uri: image?.path
            ? BASE_URL + image.path
            : 'https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/428609258_934660328026535_4277631647002560547_n.jpg?stp=dst-jpg_p552x414&_nc_cat=103&cb=99be929b-b574a898&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeFClVYeGhCoqaGSOVGoYHcA6klL6O598OHqSUvo7n3w4eluU1VRtX_7GB4oO32_-B_5Md0uHVBrBEsjof2pR2h7&_nc_ohc=oCyM3EfJPksAX-ucoBj&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfDipmJdGyJUGk0QFpzFcRbCBoD8iIbj9nraPGHepemH8w&oe=65E77D67',
        }}
        key={image?._id}
        resizeMode="cover"
        style={{
          borderRadius: hp(0.8),
          marginBottom: hp(0.4),
          width:
            totalData === 1 ? widthPercentageToDP(60) : widthPercentageToDP(30),
          height: totalData === 1 ? hp(30) : hp(20),
        }}
      />
    </Pressable>
  );
};

export default memo(RenderImageMessageComponent);
