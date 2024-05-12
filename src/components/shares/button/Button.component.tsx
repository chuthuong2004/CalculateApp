import {StyleSheetProps} from '@/types/commons';
import {ColorType} from '@/types/unions';
import {useTheme} from '@react-navigation/native';
import {Button, ButtonProps} from '@rneui/themed';
import {getStyleColorButton} from '@utils';
import {FONT_SIZE} from '@utils/constants';
import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform, StyleSheet} from 'react-native';
import {TextNormalComponent} from '../text';
import {hp} from '@utils/helpers';

interface ButtonLoadingProps extends ButtonProps {
  rounded?: boolean;
  outline?: boolean;
  spacingHorizontal?: number;
  color?: ColorType;
  gradient?: boolean;
}

const ButtonComponent = ({
  color = 'primary',
  children,
  size = 'md',
  rounded,
  spacingHorizontal,
  ...passProps
}: ButtonLoadingProps) => {
  const {t} = useTranslation();
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark, rounded, size, ...passProps});

  return (
    <Button
      color={color ? color : colors.text}
      {...passProps}
      size={size}
      style={[styles.styleBtn, passProps.style]}
      title={
        typeof passProps.title === 'string' ? (
          <TextNormalComponent
            size={size}
            style={[styles.title, passProps.titleStyle]}>
            {passProps.title || ''}
          </TextNormalComponent>
        ) : (
          passProps.title
        )
      }
      titleStyle={[
        styles.title,
        color && getStyleColorButton({colors, dark})[color]?.title,
        passProps.outline && {
          color: colors.primary,
        },
        passProps.titleStyle,
      ]}
      buttonStyle={[
        styles.button,
        spacingHorizontal ? {paddingHorizontal: spacingHorizontal} : {},

        color && getStyleColorButton({colors, dark})[color]?.button,
        passProps.outline && {
          borderColor: colors.primary,
        },
        passProps.buttonStyle,
      ]}
      disabledStyle={[styles.disableStyle, passProps.disabledStyle]}>
      {typeof children === 'string' ? t(children) : children}
    </Button>
  );
};

export default memo(ButtonComponent);
const styling = ({
  colors,
  rounded,
  size,
  outline,
}: StyleSheetProps & ButtonLoadingProps) =>
  StyleSheet.create({
    styleBtn: {
      // backgroundColor: 'red',
    },
    button: {
      // backgroundColor: outline ? colors.background : colors.primary,
      // borderWidth: outline ? 1 : 0,
      // borderColor: outline ? colors.primary : colors.background,
      padding: size ? PADDING_BY_PLATFORM[Platform.OS][size] : 0,
      borderRadius: rounded ? hp(5) : hp(0.6),
    },
    title: {
      // color: outline ? colors.primary : APP_COLORS_DARK.colors.text,
      fontSize: FONT_SIZE[size ? size : 'md'],
    },
    disableStyle: {
      backgroundColor: outline ? colors.background : colors.primary,
      opacity: 0.9,
    },
  });

const PADDING_BY_PLATFORM: Record<
  'android' | 'ios' | 'windows' | 'macos' | 'web',
  Record<'sm' | 'md' | 'lg', number>
> = {
  ios: {
    sm: hp(1),
    md: hp(1.5), // wp(3.5),
    lg: hp(2.2),
  },
  android: {
    sm: hp(1),
    md: hp(1.2), // wp(3.5),
    lg: hp(2.2),
  },
  windows: {
    sm: 5,
    md: 12,
    lg: 20,
  },
  web: {
    sm: 5,
    md: 12,
    lg: 20,
  },
  macos: {
    sm: 5,
    md: 12,
    lg: 20,
  },
};
