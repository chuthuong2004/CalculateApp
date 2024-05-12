import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {ICON} from '@utils/constants';
import {StyleSheetProps} from '@/types/commons';
import AppVectorIcons from '../icons/AppVectorIcons';
import {TextNormalComponent} from '../text';
import {useTheme} from '@react-navigation/native';
import {spacing} from '@styles';
import {hp} from '@utils/helpers';

type HeadingSheetProps = {
  onCloseSheet: () => void;
  title: string;
  iconType?: 'close' | 'back';
};
const HeadingSheetComponent = ({
  title,
  iconType = 'close',
  onCloseSheet,
}: HeadingSheetProps) => {
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark});
  return (
    <View style={[spacing('padding').horizontal, styles.heading]}>
      <TouchableOpacity style={styles.closeIcon} onPress={onCloseSheet}>
        <AppVectorIcons
          type={iconType === 'close' ? 'AntDesign' : 'Entypo'}
          name={
            iconType === 'close' ? ICON.AntDesign.close : ICON.Entypo.arrowBack
          }
          size={hp(2.4)}
        />
      </TouchableOpacity>
      <TextNormalComponent align="center">{title}</TextNormalComponent>
      <View />
    </View>
  );
};

export default HeadingSheetComponent;
const styling = ({colors}: StyleSheetProps) =>
  StyleSheet.create({
    heading: {
      borderBottomWidth: 0.5,
      paddingVertical: hp(2),
      borderBottomColor: colors.border,
    },
    closeIcon: {
      position: 'absolute',
      top: '50%',
      left: hp(1),
      padding: hp(1),
      zIndex: 1,
    },
  });
