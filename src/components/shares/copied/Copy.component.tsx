import React, {memo, useCallback} from 'react';
import {AppVectorIcons} from '../icons';
import {TouchableOpacity} from 'react-native';
import {ICON} from '@utils/constants';
import Clipboard from '@react-native-clipboard/clipboard';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {hp} from '@utils/helpers';

const AnimatedIcons = Animated.createAnimatedComponent(AppVectorIcons);

type CopyProps = {
  code: string;
};
const CopyComponent = ({code}: CopyProps) => {
  // ** Shared value
  const scaleCheckmark = useSharedValue(0);

  const copyToClipboard = useCallback(() => {
    scaleCheckmark.value = withTiming(1);
    Clipboard.setString(code);
    setTimeout(() => {
      scaleCheckmark.value = withTiming(0);
    }, 2000);
  }, [code, scaleCheckmark]);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(scaleCheckmark.value, [0, 0.5, 1], [0, 1.4, 1]),
      },
    ],
    opacity: interpolate(scaleCheckmark.value, [0, 1], [0, 1]),
  }));
  const animatedStylesCopy = useAnimatedStyle(() => ({
    opacity: interpolate(scaleCheckmark.value, [0, 1], [1, 0]),
    transform: [
      {
        scale: interpolate(scaleCheckmark.value, [0, 0.5, 1], [1, 1.4, 0]),
      },
    ],
  }));
  return (
    <TouchableOpacity onPress={copyToClipboard}>
      <AnimatedIcons
        type="AntDesign"
        name="check"
        size={hp(2)}
        style={[{position: 'absolute'}, animatedStyles]}
      />
      <AnimatedIcons
        type="Ionicons"
        name={ICON.Ionicons.copyOutline}
        size={hp(2)}
        style={animatedStylesCopy}
      />
    </TouchableOpacity>
  );
};

export default memo(CopyComponent);
