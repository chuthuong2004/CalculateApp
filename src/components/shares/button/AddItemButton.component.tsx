import React, {ReactNode, forwardRef, memo} from 'react';
import {Pressable, PressableProps, StyleSheet, View} from 'react-native';

// ** Global styles
import {POSITION_STYLE} from '@styles/position.style';

// ** Constants
import {APP_WIDTH, ICON} from '@utils/constants';

// ** Navigation
import {useTheme} from '@react-navigation/native';

// ** Types
import {StyleSheetProps} from '@/types/commons';
import {SHADOW_STYLE} from '@styles/shadow.style';
import Animated, {
  SharedValue,
  ZoomIn,
  ZoomOut,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {AppVectorIcons} from '../icons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {hp} from '@utils';

interface AddItemButtonProps extends Pick<PressableProps, 'onPress'> {
  renderIcon?: ReactNode;
  renderChild?: () => ReactNode;
  border?: boolean;
  spacingBottom?: number;
  sharedValue?: SharedValue<number>;
}
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AddItemButtonComponent = forwardRef<View, AddItemButtonProps>(
  (
    {
      onPress,
      border,
      renderChild,
      renderIcon,
      sharedValue,
      spacingBottom = wp(30) / 30,
    },
    ref,
  ) => {
    const {colors, dark} = useTheme();
    const styles = styling({colors, dark});

    // ** Animated styles button add
    const animatedStylesButton = useAnimatedStyle(() => {
      return sharedValue
        ? {
            opacity: interpolate(sharedValue.value, [0, 1], [0, 1]),
            transform: [
              {scale: interpolate(sharedValue.value, [1, 0], [1, 0])},
            ],
          }
        : {};
    });
    const animContainer = useAnimatedStyle(() => ({
      zIndex: sharedValue && interpolate(sharedValue.value, [0, 1], [-1, 1]),
    }));
    return (
      <AnimatedPressable
        entering={ZoomIn}
        exiting={ZoomOut}
        ref={ref}
        onPress={onPress}
        style={[
          POSITION_STYLE({
            position: 'bottom-right',
            distance: {
              right: APP_WIDTH / 30,
              bottom: spacingBottom,
            },
          }).absolute,
          animContainer,
        ]}>
        <Animated.View
          style={[
            SHADOW_STYLE.shadowCard,
            border && styles.border,
            styles.btnAddNew,
            sharedValue && animatedStylesButton,
          ]}>
          {renderIcon ? (
            renderIcon
          ) : (
            <AppVectorIcons
              type="AntDesign"
              name={ICON.AntDesign.plus}
              size={hp(2.4)}
              primary
            />
          )}
          {renderChild && renderChild()}
        </Animated.View>
      </AnimatedPressable>
    );
  },
);

export default memo(AddItemButtonComponent);

const styling = ({colors}: StyleSheetProps) =>
  StyleSheet.create({
    btnAddNew: {
      backgroundColor: colors.primary,
      padding: hp(1),
      width: hp(5),
      height: hp(5),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: hp(5),
      zIndex: 1,
    },
    border: {
      borderWidth: 2,
      borderColor: colors.card,
    },
  });
