import React, {memo, useState} from 'react';
import {SearchBar} from '@rneui/themed';
import {View, StyleSheet, Platform} from 'react-native';

// ** Hooks
import {useTranslation} from 'react-i18next';

// ** Global Styles
import {SearchBarDefaultProps} from '@rneui/base/dist/SearchBar/types';
import {useTheme} from '@react-navigation/native';
import AppVectorIcons from '../icons/AppVectorIcons';
import {StyleSheetProps} from '@/types/commons';
import {FONT_SIZE} from '@utils/constants';
import {hp} from '@utils/helpers';

export interface SearchBarComponentProps extends SearchBarDefaultProps {
  rounded?: boolean;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBarCustom = ({
  showLoading = false,
  placeholder = 'Search',
  onChangeText,
  value,
  rounded,
  setValue,
  ...passProps
}: SearchBarComponentProps) => {
  const {t} = useTranslation();
  const {colors, dark} = useTheme();
  const [search, setSearch] = useState('');
  const styles = styling({colors, dark});

  return (
    <View style={[styles.view, passProps.style]}>
      <SearchBar
        placeholder={t(placeholder) || ''}
        onChangeText={
          setValue
            ? text => setValue(text)
            : onChangeText
            ? onChangeText
            : text => setSearch(text)
        }
        value={value ? value : search}
        containerStyle={styles.containerStyle}
        platform={'ios'}
        inputContainerStyle={[
          styles.inputContainerStyle,
          rounded && {borderRadius: hp(10)},
        ]}
        showLoading={showLoading}
        searchIcon={
          <AppVectorIcons
            name="search-outline"
            type="Ionicons"
            size={hp(2)}
            color={colors.text}
          />
        }
        leftIconContainerStyle={[
          styles.leftIconContainerStyle,
          passProps.leftIconContainerStyle,
        ]}
        rightIconContainerStyle={[
          styles.rightIconContainerStyle,
          passProps.rightIconContainerStyle,
        ]}
        inputStyle={[styles.inputStyle, passProps.inputStyle]}
        showCancel={true}
        // cancelIcon={
        //   <TouchableOpacity onPress={() => setSearch('')}>
        //     <AppVectorIcons
        //       name="arrow-left"
        //       type="Feather"
        //       size={20}
        //       color={colors.text}
        //     />
        //   </TouchableOpacity>
        // }
        // clearIcon={
        //   <TouchableOpacity
        //     onPress={() => (setValue ? setValue('') : setSearch(''))}>
        //     <AppVectorIcons
        //       name="closecircle"
        //       type="AntDesign"
        //       size={20}
        //       color={colors.text}
        //     />
        //   </TouchableOpacity>
        // }
      />
    </View>
  );
};

const styling = ({colors}: StyleSheetProps) =>
  StyleSheet.create({
    view: {
      // width: CONST.common.WIDTH,
      width: '100%',
      backgroundColor: 'red',
      marginHorizontal: Platform.OS === 'ios' ? hp(-0.8) : 0,
      flex: 1,
    },
    containerStyle: {
      backgroundColor: colors.background,
    },
    inputContainerStyle: {
      backgroundColor: colors.card,
      height: Platform.OS === 'ios' ? hp(5) : hp(4.8),
      // borderWidth: 1,
      // borderBottomWidth: 1,
      padding: hp(0.2),
      flexDirection: 'row',
      borderRadius: hp(0.8),
      borderColor: colors.border,
    },
    leftIconContainerStyle: {},
    rightIconContainerStyle: {},
    inputStyle: {
      fontSize: FONT_SIZE.md,
      color: colors.text,
    },
  });

export default memo(SearchBarCustom);
