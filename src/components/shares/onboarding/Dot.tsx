import React from 'react';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {APP_WIDTH} from '@utils/constants';
import {hp} from '@utils/helpers';

const DOT_WIDTH = hp(1.5);
const ACTIVE_WIDTH = hp(3);

type Props = {
  index: number;
  x: SharedValue<number>;
};
const Dot = ({index, x}: Props) => {
  const animatedDotStyle = useAnimatedStyle(() => {
    const withAnimation = interpolate(
      x.value,
      [(index - 1) * APP_WIDTH, index * APP_WIDTH, (index + 1) * APP_WIDTH],
      [DOT_WIDTH, ACTIVE_WIDTH, DOT_WIDTH],
      Extrapolate.CLAMP,
    );
    const opacityAnimation = interpolate(
      x.value,
      [(index - 1) * APP_WIDTH, index * APP_WIDTH, (index + 1) * APP_WIDTH],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP,
    );
    return {
      width: withAnimation,
      opacity: opacityAnimation,
    };
  });
  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, APP_WIDTH, 2 * APP_WIDTH],
      ['#005b4f', '#1e2169', '#f15937'],
    );
    return {
      backgroundColor,
    };
  });
  return (
    <Animated.View
      style={[
        {
          height: hp(1.5),
          backgroundColor: 'red',
          marginHorizontal: hp(1),
          borderRadius: hp(10),
        },
        animatedDotStyle,
        animatedColor,
      ]}
    />
  );
};

export default Dot;
