import {View, StyleSheet} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {AppVectorIcons} from '../icons';
import {COLORS_APP, ICON} from '@utils/constants';
import {StyleSheetProps} from '@/types/commons';
import {TextNormalComponent} from '../text';
import {useTheme} from '@react-navigation/native';
import {useAppSelector} from '@/store/index';
import {selectCartItems} from '@/store/selectors';
import {hp} from '@utils/helpers';

type BadgeCartProps = {
  onPress: () => void;
  color: 'dark' | 'light';
};
const BadgeCartComponent = ({onPress, color}: BadgeCartProps) => {
  const cartItems = useAppSelector(selectCartItems);
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark});
  return (
    <TouchableOpacity onPress={onPress}>
      <AppVectorIcons
        type="Feather"
        name={ICON.Feather.shoppingBag}
        size={hp(2.5)}
        color={color === 'light' ? colors.text : COLORS_APP.dark}
      />
      {cartItems.length > 0 && (
        <View style={[styles.badge]}>
          <TextNormalComponent size="xs">
            {cartItems.length}
          </TextNormalComponent>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default BadgeCartComponent;
const styling = ({colors}: StyleSheetProps) =>
  StyleSheet.create({
    badge: {
      position: 'absolute',
      top: hp(-1),
      right: hp(-0.5),
      backgroundColor: colors.notification,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      minWidth: hp(2),
      minHeight: hp(2),
      padding: hp(0.4),
    },
  });
