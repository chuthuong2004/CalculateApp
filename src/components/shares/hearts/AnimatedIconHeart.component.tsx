import {SizeText} from '@/types/unions';
import {useTheme} from '@react-navigation/native';
import {SHADOW_STYLE} from '@styles/shadow.style';
import {COLORS, ICON} from '@utils/constants';
import React, {memo, useEffect} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {hp} from '@utils/helpers';
import {AnimatedIcon} from '../icons';

type AnimatedIconHeartProps = {
  hearted: boolean;
  containerStyle?: ViewStyle;
  iconStyle?: ViewStyle;
  outline?: boolean;
  size?: SizeText;
};
const AnimatedIconHeartComponent = ({
  hearted,
  containerStyle,
  iconStyle,
  outline,
  size = 'md',
}: AnimatedIconHeartProps) => {
  const scaleHeart = useSharedValue(0);

  useEffect(() => {
    scaleHeart.value = withTiming(hearted ? 1 : 0, {}, finished => {
      if (finished) {
      }
    });
  }, [hearted, scaleHeart]);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(scaleHeart.value, [0, 0.5, 1], [0, 1.4, 1]),
      },
    ],
  }));
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.iconHeart,
        SHADOW_STYLE.shadowCard,
        {backgroundColor: colors.card},
        containerStyle ? containerStyle : styles.position,
      ]}>
      <AnimatedIcon
        style={[styles.activeHeart, iconStyle, animatedStyles]}
        type="Ionicons"
        name={ICON.Ionicons.heart}
        size={
          size === 'md'
            ? hp(3)
            : size === 'lg'
            ? hp(3.5)
            : size === 'sm'
            ? hp(2.5)
            : hp(4)
        }
        color={COLORS.heart}
      />
      <AnimatedIcon
        type="Ionicons"
        name={outline ? ICON.Ionicons.heartOutline : ICON.Ionicons.heart}
        size={
          size === 'md'
            ? hp(3)
            : size === 'lg'
            ? hp(3.5)
            : size === 'sm'
            ? hp(2.5)
            : hp(4)
        }
        color={outline ? COLORS.heart : colors.background}
      />
    </View>
  );
};

export default memo(AnimatedIconHeartComponent);

const styles = StyleSheet.create({
  iconHeart: {
    position: 'absolute',
    borderRadius: 50,
    padding: hp(0.2),
  },
  position: {
    right: hp(0.2),
    bottom: hp(0.2),
  },
  activeHeart: {
    position: 'absolute',
    top: hp(0.2),
    left: hp(0.2),
    zIndex: 1,
  },
});
