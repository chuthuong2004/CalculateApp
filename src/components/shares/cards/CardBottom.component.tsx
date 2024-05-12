import {View, StyleSheet, ViewProps, Platform} from 'react-native';
import React, {memo} from 'react';

// ** Types
import {StyleSheetProps} from '@/types/commons';

// ** Global styles
import {flex, spacing, SHADOW_STYLE} from '@styles';

// ** Constants
import {SIZE_APP, APP_WIDTH} from '@utils/constants';
import {useTheme} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type CardBottomProps = {
  absolute?: boolean;
  shadow?: boolean;
  corner?: boolean;
  children: ViewProps['children'];
  style?: ViewProps['style'];
  transparent?: boolean;
};
const CartBottomComponent = ({
  children,
  shadow = true,
  corner = true,
  absolute,
  transparent,
  style,
}: CardBottomProps) => {
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark});
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.bottom,
        spacing('padding').around,
        Platform.OS === 'ios' &&
          APP_WIDTH / 30 < insets.bottom && {
            paddingBottom: insets.bottom,
          },
        shadow && SHADOW_STYLE.shadowTop,
        corner && styles.corner,
        transparent && styles.transparent,
        absolute && styles.absolute,
        flex.row,
        flex.gap10,
        style,
      ]}>
      {children}
    </View>
  );
};

export default memo(CartBottomComponent);

const styling = ({colors}: StyleSheetProps) =>
  StyleSheet.create({
    bottom: {
      backgroundColor: colors.card,
      width: '100%',
      // minHeight: 100,
    },
    absolute: {
      position: 'absolute',
      bottom: 0,
    },
    transparent: {
      backgroundColor: colors.background,
    },
    corner: {
      borderTopLeftRadius: SIZE_APP.sm,
      borderTopRightRadius: SIZE_APP.sm,
    },
  });
