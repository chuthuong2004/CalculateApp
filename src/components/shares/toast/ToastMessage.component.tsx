import {View, StyleSheet} from 'react-native';
import React, {memo, useCallback, useEffect} from 'react';
import {StyleSheetProps} from '@/types/commons';
import {useTheme} from '@react-navigation/native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {APP_COLORS_DARK, APP_HEIGHT, APP_WIDTH} from '@utils/constants';
import {useAppDispatch, useAppSelector} from '@/store';
import {selectToast} from '@/store/selectors';
import {setToast} from '@/store/actions';
import {TextNormalComponent} from '../text';
import {ColorType} from '@/types/unions';

type ToastMessageProps = {
  duration?: number;
};
const ToastMessageComponent = ({duration = 2000}: ToastMessageProps) => {
  const dispatch = useAppDispatch();
  const {toast, variant} = useAppSelector(selectToast);
  const sharedValue = useSharedValue(0);
  const clearToast = useCallback(() => {
    dispatch(
      setToast({
        toast: '',
        variant: 'dark',
      }),
    );
  }, [dispatch]);
  useEffect(() => {
    if (toast) {
      sharedValue.value = withRepeat(
        withSpring(
          -APP_HEIGHT / 8,
          {
            duration: duration,
            dampingRatio: 0.4,
            stiffness: 288,
            overshootClamping: true,
            restDisplacementThreshold: 83.5,
            restSpeedThreshold: 99.06,
          },
          finished => {
            if (finished) {
              sharedValue.value = withTiming(0, {}, () => {
                runOnJS(clearToast)();
              });
            }
          },
        ),
        1,
        true,
      );
    }
  }, [sharedValue, clearToast, toast, duration]);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: sharedValue.value,
        },
      ],
    };
  });

  const {colors, dark} = useTheme();
  const styles = styling({colors, dark, variant});

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.wrapper, animatedStyles]}>
        <TextNormalComponent align="center" variant={variant}>
          {toast}
        </TextNormalComponent>
      </Animated.View>
    </View>
  );
};

export default memo(ToastMessageComponent);

const styling = ({variant}: StyleSheetProps & {variant: ColorType}) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      top: '100%',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: APP_WIDTH / 15,
      zIndex: 20,
    },
    wrapper: {
      backgroundColor: COLORS_TOAST[variant],
      padding: 10,
      borderRadius: 8,
      minWidth: APP_WIDTH / 2,
      alignItems: 'center',
      zIndex: 20,
    },
  });

const COLORS_TOAST: Record<ColorType, string> = {
  danger: '#ffe0e0',
  dark: '#283047',
  info: '#87affa46',
  light: '#ffffff',
  primary: APP_COLORS_DARK.colors.primary,
  secondary: '#28c76f1d',
  success: '#e3fdec',
  warning: '#f7e3a867',
};
