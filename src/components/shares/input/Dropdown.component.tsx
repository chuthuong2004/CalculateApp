import React, {memo, useCallback} from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import {Dropdown as DropdownCustom} from 'react-native-element-dropdown';
import {DropdownProps} from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import AppVectorIcons from '../icons/AppVectorIcons';

// ** Global Styles
import {flex, spacing} from '@styles';

// ** Constants
import {COLORS_APP, FONT_SIZE, ICON} from '@utils/constants';

// ** Types
import {StyleSheetProps} from '@/types/commons';
import {ColorType} from '@/types/unions';
import {hp} from '@utils/helpers';

interface DropDownComponentProps<T> extends DropdownProps<T> {
  iconName?: string;
  variant?: ColorType;
  error?: boolean;
}

const Dropdown = <T,>(props: DropDownComponentProps<T>) => {
  const {
    onChange,
    onBlur,
    value,
    data,
    labelField,
    valueField,
    placeholder,
    disable = false,
    search = false,
    iconName,
    dropdownPosition = 'bottom',
    variant,
    showsVerticalScrollIndicator = false,
    error,
  } = props;
  const {t} = useTranslation();
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark, variant});
  const renderLeftIcon = useCallback(
    () => (
      <View style={spacing('padding', 0, 10).horizontal}>
        {iconName && (
          <AppVectorIcons
            type="Ionicons"
            name={iconName}
            size={hp(1.8)}
            color={variant ? COLORS_APP[variant] : colors.text}
          />
        )}
      </View>
    ),
    [colors.text, iconName, variant],
  );
  const renderRightIcon = useCallback(
    () => (
      <View style={spacing('padding', 0, 10).horizontal}>
        <AppVectorIcons
          type="EvilIcons"
          name={ICON.EvilIcons.arrowDown}
          size={hp(3)}
          color={variant ? COLORS_APP[variant] : colors.text}
        />
      </View>
    ),
    [variant, colors.text],
  );
  return (
    <DropdownCustom
      {...props}
      renderLeftIcon={renderLeftIcon}
      renderRightIcon={renderRightIcon}
      style={[styles.dropdown, error && styles.error, props.style, flex.gap10]}
      placeholderStyle={[styles.placeholderStyle, props.placeholderStyle]}
      selectedTextStyle={[styles.selectedTextStyle, props.selectedTextStyle]}
      inputSearchStyle={[styles.inputSearchStyle, props.inputSearchStyle]}
      containerStyle={[styles.containerStyle, props.containerStyle]}
      itemTextStyle={[styles.itemTextStyle, props.itemTextStyle]}
      data={data}
      // maxHeight={300}
      labelField={labelField}
      valueField={valueField}
      placeholder={t(placeholder || '') || ''}
      searchPlaceholder={'search'}
      value={value}
      disable={disable}
      search={search}
      activeColor={variant ? COLORS_APP[variant] : colors.primary}
      itemContainerStyle={[styles.itemContainerStyle, props.itemContainerStyle]}
      confirmSelectItem={false}
      keyboardAvoiding
      autoScroll
      dropdownPosition={dropdownPosition}
      iconColor={variant ? COLORS_APP[variant] : colors.text}
      // ** Callback
      onConfirmSelectItem={props.onConfirmSelectItem}
      onChangeText={props.onChangeText}
      renderInputSearch={props.renderInputSearch}
      onFocus={props.onFocus}
      onBlur={onBlur}
      onChange={onChange}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
    />
  );
};

const styling = ({
  colors,
  dark,
  variant,
}: StyleSheetProps & {variant?: ColorType}) =>
  StyleSheet.create({
    dropdown: {
      backgroundColor: colors.card,
      borderRadius: hp(0.8),
      padding: 0,
      maxHeight: hp(5),
      fontSize: 20,
      paddingTop: Platform.OS === 'ios' ? hp(1.5) : hp(1),
      paddingBottom: Platform.OS === 'ios' ? hp(1.5) : hp(1),
    },
    error: {
      borderColor: COLORS_APP.danger,
      borderWidth: 1,
    },
    placeholderStyle: {
      fontSize: FONT_SIZE.md,
      color: dark ? '#f7f8f95a' : '#414b5a8e',
    },
    selectedTextStyle: {
      color: variant ? COLORS_APP[variant] : colors.text,
      fontSize: FONT_SIZE.md,
    },
    inputSearchStyle: {
      height: hp(8),
      fontSize: hp(2),
      color: colors.text,
      borderColor: 'red',
    },
    containerStyle: {
      borderRadius: hp(0.8),
      backgroundColor: colors.background,
      gap: hp(1),
      padding: hp(1),
      borderColor: variant ? COLORS_APP[variant] : colors.primary,
    },

    itemContainerStyle: {
      backgroundColor: colors.card,
      borderRadius: hp(0.8),
      gap: hp(1),
      marginVertical: hp(0.5),
    },
    itemTextStyle: {
      color: colors.text,
    },
  });

export default Dropdown;
