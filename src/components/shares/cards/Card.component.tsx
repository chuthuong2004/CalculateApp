import {View, StyleSheet, ViewProps} from 'react-native';
import React, {memo} from 'react';
import {StyleSheetProps} from '@/types/commons';
import {useTheme} from '@react-navigation/native';
import {SHADOW_STYLE} from '@styles/shadow.style';
import {hp} from '@utils/helpers';
interface CardProps extends ViewProps {
  shadow?: boolean;
  corner?: boolean;
  outline?: boolean;
  primary?: boolean;
  transparent?: boolean;
}
const CardComponent = ({
  shadow,
  corner = true,
  outline = false,
  primary,
  transparent,
  ...passProps
}: CardProps) => {
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark});
  return (
    <View
      {...passProps}
      style={[
        styles.container,
        corner && styles.corner,
        outline && styles.outline,
        primary && styles.primary,
        transparent && styles.transparent,
        shadow && SHADOW_STYLE.shadowCard,
        passProps.style,
      ]}>
      {passProps.children}
    </View>
  );
};

export default memo(CardComponent);

const styling = ({colors}: StyleSheetProps) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      padding: hp(1),
    },
    corner: {borderRadius: 8},
    outline: {
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
    },
    primary: {
      borderWidth: 1,
      borderColor: colors.primary,
    },
    transparent: {
      backgroundColor: colors.background,
    },
  });
