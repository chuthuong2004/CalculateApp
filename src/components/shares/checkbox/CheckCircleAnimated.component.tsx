import {Pressable, PressableProps} from 'react-native';
import React, {memo, useEffect} from 'react';
import Animated, {
  FadeIn,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {COLORS_APP, ICON} from '@utils/constants';
import {AppVectorIcons} from '@components/shares/icons';
import {flex} from '@styles';
import {ColorType} from '@/types/unions';
import {hp} from '@utils/helpers';

const AnimatedIcons = Animated.createAnimatedComponent(AppVectorIcons);
const PressableAnimated = Animated.createAnimatedComponent(Pressable);

type CheckCircleProps = {
  onChecked: PressableProps['onPress'];
  checked: boolean;
  variant?: ColorType;
  iconShape?: 'circle' | 'square';
};
const CheckCircleAnimatedComponent = ({
  onChecked,
  checked,
  variant = 'primary',
  iconShape = 'circle',
}: CheckCircleProps) => {
  // ** Shared value
  const scaleCheckmark = useSharedValue(0);
  useEffect(() => {
    scaleCheckmark.value = withTiming(checked ? 1 : 0, {}, finished => {
      if (finished) {
      }
    });
  }, [checked, scaleCheckmark]);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(scaleCheckmark.value, [0, 0.5, 1], [0, 1.4, 1]),
      },
    ],
  }));
  let checkedIcon: string | React.ReactElement<{}> =
    iconShape === 'circle'
      ? ICON.Ionicons.checkmarkCircle
      : ICON.MaterialCommunityIcons.checkboxMarked;
  let uncheckedIcon: string | React.ReactElement<{}> =
    iconShape === 'circle'
      ? ICON.Ionicons.radioButton
      : ICON.MaterialCommunityIcons.checkboxOutline;
  return (
    <PressableAnimated
      entering={FadeIn.duration(300)}
      onPress={onChecked}
      style={[flex.row]}>
      <AnimatedIcons
        type={iconShape === 'circle' ? 'Ionicons' : 'MaterialCommunityIcons'}
        name={uncheckedIcon}
        size={hp(2.4)}
        color={COLORS_APP[variant]}
      />
      <AnimatedIcons
        type={iconShape === 'circle' ? 'Ionicons' : 'MaterialCommunityIcons'}
        name={checkedIcon}
        // color={colors.primary}
        size={hp(2.4)}
        color={COLORS_APP[variant]}
        style={[{position: 'absolute'}, animatedStyles]}
      />
    </PressableAnimated>
  );
};

export default memo(CheckCircleAnimatedComponent);
