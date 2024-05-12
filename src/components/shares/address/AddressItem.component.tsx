import {View, StyleSheet, Pressable} from 'react-native';
import React, {memo} from 'react';

// ** Share components
import {
  TextNormalComponent,
  AppVectorIcons,
  BadgeComponent,
} from '@components/shares';

// ** Global Styles
import {spacing, flex} from '@styles';

// ** Navigation hooks
import {useNavigation, useTheme} from '@react-navigation/native';

// ** Types
import {StoreAddress, StyleSheetProps} from '@/types/commons';
import {CartStackScreenProps} from '@navigation/app/cart/types';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {hp} from '@utils/helpers';

type AddressItemProps = {
  checked: boolean;
  address: StoreAddress;
  onCheckedItem: (address: StoreAddress) => void;
};
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AddressItemComponent = ({
  checked,
  address,
  onCheckedItem,
}: AddressItemProps) => {
  const navigation =
    useNavigation<CartStackScreenProps<'Checkout'>['navigation']>();
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark});
  return (
    <AnimatedPressable
      entering={FadeInDown.duration(300).springify()}
      onPress={() => onCheckedItem(address)}
      style={[
        flex.row,
        flex.gap10,
        spacing('padding').around,
        styles.container,
      ]}>
      <View>
        <View
          style={[
            styles.iconAddress,
            address.default && {
              backgroundColor: '#87affa46',
            },
          ]}>
          <AppVectorIcons
            type="MaterialCommunityIcons"
            name={address.type === 'home' ? 'home-variant' : 'office-building'}
            size={hp(2.4)}
            color={address.default ? colors.primary : colors.text}
          />
        </View>
      </View>

      <View style={[flex.flex1]}>
        <View style={[flex.row, flex.justifyContentBetween, flex.gap10]}>
          <View style={[flex.row, flex.gap10, flex.alignItemsCenter]}>
            <TextNormalComponent fontWeight="500">
              {address.full_name}
            </TextNormalComponent>
            {address.default && (
              <BadgeComponent text="Mặc định" size="sm" variant="info" />
            )}
          </View>
          <View>
            {checked ? (
              <AppVectorIcons
                type="MaterialCommunityIcons"
                name="radiobox-marked"
                size={hp(2.4)}
                color={colors.primary}
              />
            ) : (
              <AppVectorIcons
                type="MaterialCommunityIcons"
                name="radiobox-blank"
                size={hp(2.4)}
              />
            )}
          </View>
        </View>

        <TextNormalComponent variant="secondary">
          {address.phone}
        </TextNormalComponent>
        <View style={[flex.row, flex.justifyContentBetween, flex.gap10]}>
          <TextNormalComponent variant="secondary" style={flex.flex1}>
            {`${address.address.specific}, ${address.address.ward}, ${address.address.district}, ${address.address.province}`}
          </TextNormalComponent>
          <Pressable
            onPress={() =>
              navigation.navigate('FormAddress', {address, province: null})
            }>
            <TextNormalComponent variant="primary">Edit</TextNormalComponent>
          </Pressable>
        </View>
      </View>
    </AnimatedPressable>
  );
};

export default memo(AddressItemComponent);

const styling = ({colors}: StyleSheetProps) =>
  StyleSheet.create({
    container: {
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    iconAddress: {
      padding: hp(0.8),
      borderRadius: hp(5),
      backgroundColor: colors.border,
      height: 'auto',
    },
  });
