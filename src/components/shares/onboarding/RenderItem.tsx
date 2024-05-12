import {View, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import {OnboardingData} from './Onboarding.component';
import {TextNormalComponent} from '../text';
import AnimatedLottieView from 'lottie-react-native';
import {APP_WIDTH} from '@utils/constants';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

type Props = {
  item: OnboardingData;
  index: number;
  x: SharedValue<number>;
};
const RenderItem = ({item, index, x}: Props) => {
  const lottieAnimation = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      x.value,
      [(index - 1) * APP_WIDTH, index * APP_WIDTH, (index + 1) * APP_WIDTH],
      [200, 0, -200],
      Extrapolate.CLAMP,
    );
    return {
      transform: [
        {
          translateY: translateYAnimation,
        },
      ],
    };
  });
  const circleAnimation = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [(index - 1) * APP_WIDTH, index * APP_WIDTH, (index + 1) * APP_WIDTH],
      [1, 4, 4],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{scale}],
    };
  });
  return (
    <View style={[styles.itemContainer, {width: APP_WIDTH}]}>
      <View style={[styles.circleContainer]}>
        <Animated.View
          style={[
            {
              width: APP_WIDTH,
              height: APP_WIDTH,
              backgroundColor: item.backgroundColor,
              borderRadius: APP_WIDTH / 2,
            },
            circleAnimation,
          ]}
        />
      </View>
      <Animated.View style={[lottieAnimation]}>
        <AnimatedLottieView
          source={item.animation}
          style={{
            width: APP_WIDTH * 0.9,
            height: APP_WIDTH * 0.9,
          }}
          autoPlay
          loop
        />
      </Animated.View>
      <TextNormalComponent
        size="6xl"
        align="center"
        color={item.textColor}
        style={{
          marginBottom: 10,
          marginHorizontal: 20,
        }}>
        {item.text}
      </TextNormalComponent>
    </View>
  );
};

export default memo(RenderItem);

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 120,
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
