import {View, StyleSheet, TextInputProps} from 'react-native';
import React from 'react';
import {flex} from '@styles';
import {StyleSheetProps} from '@/types/commons';
import {useTheme} from '@react-navigation/native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {APP_WIDTH, FONT_SIZE, SIZE_APP} from '@utils/constants';
import {TextInput} from 'react-native';

type InputSliderProps = {
  min: number;
  max: number;
};
const TextInputAnimated = Animated.createAnimatedComponent(TextInput);
const WIDTH = APP_WIDTH - APP_WIDTH / 15;
const MAX_WIDTH = WIDTH;
const InputSliderComponent = ({min, max}: InputSliderProps) => {
  const widthRight = useSharedValue(MAX_WIDTH);
  const widthLeft = useSharedValue(0);
  const scaleLeft = useSharedValue(1);
  const scaleRight = useSharedValue(1);

  const gestureHandlerLeft = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {startX: number}
  >({
    onStart(_, context) {
      context.startX = widthLeft.value;
    },
    onActive(event, context) {
      widthLeft.value =
        context.startX + event.translationX < 0
          ? 0
          : context.startX + event.translationX >=
            widthRight.value -
              max.toLocaleString('VI').length * 11 -
              (context.startX + event.translationX).toLocaleString('VI')
                .length *
                10
          ? widthRight.value -
            max.toLocaleString('VI').length * 11 -
            (context.startX + event.translationX).toLocaleString('VI').length *
              10
          : context.startX + event.translationX > MAX_WIDTH
          ? MAX_WIDTH
          : context.startX + event.translationX;
      scaleLeft.value = 1.3;
    },
    onEnd() {
      scaleLeft.value = 1;
    },
  });

  const gestureHandlerRight = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {startX: number}
  >({
    onStart(_, context) {
      context.startX = widthRight.value;
    },
    onActive(event, context) {
      widthRight.value =
        context.startX + event.translationX < 0
          ? 0
          : context.startX + event.translationX <=
            widthLeft.value +
              max.toLocaleString('VI').length * 11 +
              widthRight.value.toLocaleString('VI').length * 10
          ? widthLeft.value +
            max.toLocaleString('VI').length * 11 +
            widthRight.value.toLocaleString('VI').length * 10
          : context.startX + event.translationX > MAX_WIDTH
          ? MAX_WIDTH
          : context.startX + event.translationX;
      scaleRight.value = 1.3;
    },
    onEnd() {
      scaleRight.value = 1;
    },
  });

  const animatedStyles = useAnimatedStyle(() => ({
    width: widthRight.value - widthLeft.value,
    transform: [{translateX: widthLeft.value}],
  }));
  const animatedKnobRight = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: widthRight.value,
      },
      {
        scale: scaleRight.value,
      },
      {rotate: '45deg'},
    ],
  }));
  const animatedKnobLeft = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: widthLeft.value,
      },
      {
        scale: scaleLeft.value,
      },
      {rotate: '45deg'},
    ],
  }));

  const translateTextLeft = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: widthLeft.value,
      },
    ],
  }));
  const translateTextRight = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: widthRight.value - MAX_WIDTH,
      },
    ],
  }));

  const minLabelText = useAnimatedProps<TextInputProps>(() => {
    const prices =
      min +
      Math.floor(widthLeft.value / (MAX_WIDTH / ((max - min) / 10000))) * 10000;
    return {
      text: `${prices.toLocaleString('VI')} đ`,
    };
  });
  const maxLabelText = useAnimatedProps<TextInputProps>(() => {
    const prices =
      min +
      Math.floor(widthRight.value / (MAX_WIDTH / ((max - min) / 10000))) *
        10000;
    return {
      text: `${prices.toLocaleString('VI')} đ`,
    };
  });
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark});
  return (
    <View style={[flex.gap10, styles.container]}>
      <View style={[flex.row, flex.justifyContentBetween]}>
        <Animated.View style={[translateTextLeft]}>
          <TextInputAnimated
            defaultValue={`${min.toLocaleString('VI')}đ`}
            animatedProps={minLabelText}
            editable={false}
            style={{color: colors.text, fontSize: FONT_SIZE.md}}
          />
        </Animated.View>
        <Animated.View style={[translateTextRight]}>
          <TextInputAnimated
            defaultValue={`${max.toLocaleString('VI')}đ`}
            animatedProps={maxLabelText}
            editable={false}
            style={{color: colors.text, fontSize: FONT_SIZE.md}}
          />
        </Animated.View>
      </View>
      <View style={styles.track} />
      <Animated.View
        style={[styles.track, styles.activeTrack, animatedStyles]}
      />
      <View>
        <PanGestureHandler onGestureEvent={gestureHandlerLeft}>
          <Animated.View
            style={[styles.knob, styles.knobLeft, animatedKnobLeft]}
          />
        </PanGestureHandler>
        <PanGestureHandler onGestureEvent={gestureHandlerRight}>
          <Animated.View
            style={[styles.knob, styles.knobRight, animatedKnobRight]}
          />
        </PanGestureHandler>
      </View>
    </View>
  );
};

export default InputSliderComponent;

const styling = ({colors}: StyleSheetProps) =>
  StyleSheet.create({
    container: {},
    track: {
      height: 8,
      borderRadius: 8,
      backgroundColor: colors.border,
    },
    activeTrack: {
      backgroundColor: colors.primary,
      marginTop: -18,
    },
    knob: {
      width: 20,
      height: 20,
      backgroundColor: colors.primary,

      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
    },
    knobLeft: {
      marginLeft: -8,
      marginTop: -3,
    },
    knobRight: {
      marginLeft: -10,
      marginTop: -20,
    },
  });
