import React, {forwardRef, useState} from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

// ** Components
import AppVectorIcons from '../icons/AppVectorIcons';
import {TextNormalComponent} from '../text';

// ** React navigation
import {useTheme} from '@react-navigation/native';

// ** I18next
import {useTranslation} from 'react-i18next';

// ** Constants
import {COLORS_APP, FONT_SIZE} from '@utils/constants';

// ** Global Styles
import {flex} from '@styles';

// ** Types
import {StyleSheetProps} from '@/types/commons';
import {ColorType, IconType} from '@/types/unions';
import {hp} from '@utils/helpers';

export interface InputComponentProps extends TextInputProps {
  iconLeft?: {
    name: string;
    size?: number;
    color: string;
    type?: IconType;
  };
  iconRight?: {
    name: string;
    size?: number;
    color: string;
    type?: IconType;
  };
  onPressRight?: () => void;
  contentSizeChange?: boolean;
  error?: string | boolean;
  style?: StyleProp<ViewStyle>;
  inputStyle?: TextInputProps['style'];
  label?: string;
  rounded?: boolean;
  variant?: ColorType;
  border?: boolean;
  disabled?: boolean;
  renderRightContent?: React.ReactNode;
  transparent?: boolean;
}

const InputComponent = forwardRef<TextInput, InputComponentProps>(
  (props, ref) => {
    const {
      contentSizeChange = false,
      transparent,
      iconLeft,
      multiline,
      onPressRight,
      value,
      iconRight,
      placeholder,
      error,
      label,
      rounded,
      variant,
      border,
      disabled,
      renderRightContent,
      ...rest
    } = props;
    const {t} = useTranslation();
    const [isFocused, setIsFocused] = useState(false);
    const [height, setHeight] = useState(0);
    const {colors, dark} = useTheme();
    const styles = styling({
      colors,
      dark,
      iconLeft,
      iconRight,
      error,
      rounded,
      variant,
    });
    const colorIcon = {
      error: COLORS_APP.danger,
      primary: colors.primary,
      text: colors.text,
    };
    return (
      <View style={[flex.gap4, props.style]}>
        {label && <TextNormalComponent size="md">{label}</TextNormalComponent>}
        <View
          style={[
            styles.container,
            renderRightContent ? flex.gap4 : {},
            renderRightContent ? flex.alignItemsEnd : {},
          ]}>
          {iconLeft && (
            <AppVectorIcons
              type={iconLeft?.type ? iconLeft.type : 'Ionicons'}
              size={iconLeft?.size ? iconLeft.size : hp(2.2)}
              name={iconLeft.name}
              style={styles.iconLeft}
              color={
                variant
                  ? COLORS_APP[variant]
                  : colorIcon[error ? 'error' : isFocused ? 'primary' : 'text']
              }
            />
          )}
          <TextInput
            ref={ref}
            value={value}
            onContentSizeChange={event =>
              contentSizeChange &&
              setHeight(event.nativeEvent.contentSize.height)
            }
            multiline={multiline}
            {...rest}
            style={[
              styles.textInput,
              contentSizeChange && {height},
              isFocused && !error && {borderColor: colors.primary},
              transparent && {backgroundColor: colors.background},
              border && {borderColor: colors.border},
              variant && {borderColor: COLORS_APP[variant]},
              disabled && styles.disabled,
              renderRightContent ? flex.flex1 : {},
              props.inputStyle,
            ]}
            placeholderTextColor={dark ? '#f7f8f95a' : '#414b5a8e'}
            placeholder={t(placeholder || '') || ''}
            onBlur={props?.onBlur ? props.onBlur : () => setIsFocused(false)}
            onFocus={props?.onFocus ? props.onFocus : () => setIsFocused(true)}
          />
          {renderRightContent && (
            <View style={[styles.renderRightContent]}>
              {renderRightContent}
            </View>
          )}
          {/* ** Handle icon right */}
          {iconRight && (
            <TouchableOpacity
              onPress={onPressRight}
              style={styles.iconRightContainer}>
              <AppVectorIcons
                type={iconRight?.type ? iconRight.type : 'Ionicons'}
                size={iconRight.size ? iconRight.size : hp(2.2)}
                name={iconRight.name}
                color={
                  variant
                    ? COLORS_APP[variant]
                    : colorIcon[
                        error ? 'error' : isFocused ? 'primary' : 'text'
                      ]
                }
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Handle Error */}
        {error && typeof error === 'string' && (
          <TextNormalComponent error size="sm" style={{paddingLeft: 4}}>
            {error}
          </TextNormalComponent>
        )}
      </View>
    );
  },
);

const styling = ({
  colors,
  iconLeft,
  iconRight,
  error,
  rounded,
  variant,
  dark,
}: StyleSheetProps &
  Pick<
    InputComponentProps,
    'iconLeft' | 'iconRight' | 'error' | 'rounded' | 'variant'
  >) =>
  StyleSheet.create({
    textInput: {
      width: '100%',
      backgroundColor: colors.card,
      borderRadius: rounded ? hp(5) : hp(0.8),
      fontSize: FONT_SIZE.md,
      color: variant ? COLORS_APP[variant] : colors.text,
      borderColor: error ? COLORS_APP.danger : 'transparent',
      borderWidth: 1,
      maxHeight: hp(16),
      paddingLeft: iconLeft ? hp(3.6) : hp(1.5),
      paddingRight: iconRight ? hp(3.6) : hp(1.5),
      paddingTop: Platform.OS === 'ios' ? hp(1.5) : hp(1),
      paddingBottom: Platform.OS === 'ios' ? hp(1.5) : hp(1),
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconLeft: {
      position: 'absolute',
      left: hp(1),
      zIndex: 1,
    },
    renderRightContent: {
      zIndex: 1,
    },
    iconRightContainer: {
      position: 'absolute',
      right: hp(1),
      width: hp(4),
      paddingVertical: hp(0.8),
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    disabled: {
      backgroundColor: dark ? '#1e273c' : '#ededed',
    },
  });
export default React.memo(InputComponent);
