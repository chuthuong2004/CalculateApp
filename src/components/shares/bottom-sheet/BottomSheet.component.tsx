import React, {memo} from 'react';

// ** Reanimated
import Animated, {
  FadeIn,
  FadeOut,
  KeyboardState,
  SlideInDown,
  SlideOutDown,
  interpolate,
  runOnJS,
  useAnimatedKeyboard,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Pressable, ViewProps, StyleSheet, View} from 'react-native';

// ** Gesture handler
import {
  Gesture,
  GestureDetector,
  GestureUpdateEvent,
  PanGestureChangeEventPayload,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

// ** Constants
import {APP_HEIGHT, APP_WIDTH, SIZE_APP} from '@utils/constants';

// ** React Navigation
import {useTheme} from '@react-navigation/native';

// ** Types
import {StyleSheetProps} from '@/types/commons';

// ** Global Styles
import {SHADOW_STYLE, spacing} from '@styles';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const MAX_HEIGHT = APP_HEIGHT * 0.6;
interface BottomSheetProps extends ViewProps {
  toggleSheet: () => void;
  height?: number;
  maxHeight?: number;
  spacingValue?:
    | 'around'
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'vertical'
    | 'horizontal';
  roundedTop?: boolean;
}

const BottomSheetComponent = ({
  toggleSheet,
  children,
  maxHeight = MAX_HEIGHT,
  height,
  roundedTop = true,
  spacingValue,
  style,
}: BottomSheetProps) => {
  if (height) {
    maxHeight = height > MAX_HEIGHT ? height : MAX_HEIGHT;
  }
  const offset = useSharedValue(0);
  const pan = Gesture.Pan()
    .onChange(
      (
        event: GestureUpdateEvent<
          PanGestureHandlerEventPayload & PanGestureChangeEventPayload
        >,
      ) => {
        const offsetDelta = event.changeY + offset.value;
        const clamp = Math.max(-20, offsetDelta);
        offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
      },
    )
    .onFinalize(() => {
      if (offset.value < maxHeight / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = withTiming(maxHeight, {}, () => {
          runOnJS(toggleSheet)();
        });
      }
    });
  const keyboard = useAnimatedKeyboard();
  const translateY = useAnimatedStyle(() => ({
    transform: [{translateY: offset.value}],
    maxHeight,
    height:
      height &&
      interpolate(
        keyboard.state.value,
        [
          KeyboardState.UNKNOWN,
          KeyboardState.OPENING,
          KeyboardState.OPEN,
          KeyboardState.CLOSING,
          KeyboardState.CLOSED,
        ],
        [
          height,
          height,
          height - keyboard.height.value / 2,
          height + keyboard.height.value,
          height,
        ],
      ),
  }));
  const onToggleSheet = () => {
    toggleSheet();
    offset.value = 0;
  };
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark, roundedTop});
  return (
    <View
      style={[
        {
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 2,
        },
        style,
      ]}>
      <AnimatedPressable
        entering={FadeIn}
        exiting={FadeOut}
        style={styles.backdrop}
        onPress={onToggleSheet}
      />
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            spacingValue && spacing('padding')[spacingValue],
            SHADOW_STYLE.shadowTop,
            styles.sheet,
            height ? {height} : {},
            translateY,
          ]}
          entering={SlideInDown.springify().damping(15)}
          exiting={SlideOutDown}>
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default memo(BottomSheetComponent);
const styling = ({
  colors,
  roundedTop,
}: StyleSheetProps & Pick<BottomSheetProps, 'roundedTop'>) =>
  StyleSheet.create({
    sheet: {
      backgroundColor: colors.background,
      width: '100%',
      position: 'absolute',
      bottom: 0,
      borderTopRightRadius: APP_WIDTH / 30,
      borderTopLeftRadius: APP_WIDTH / 30,
      zIndex: 5,
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(2, 2, 2, 0.3)',
      borderTopRightRadius: roundedTop ? SIZE_APP.lg : 0,
      borderTopLeftRadius: roundedTop ? SIZE_APP.lg : 0,
      zIndex: 5,
    },
  });
