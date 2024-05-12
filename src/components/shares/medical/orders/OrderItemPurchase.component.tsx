import {View, Image, PressableProps, Pressable, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import {useTheme} from '@react-navigation/native';
import {StyleSheetProps} from '@/types/commons';
import {flex} from '@styles';
import {
  CheckCircleAnimatedComponent,
  TextNormalComponent,
  CardComponent,
} from '@components/shares';
import {StoreOrderItem} from '@/types/entities';
import {BASE_URL} from '@config/baseUrl';
import {hp} from '@utils/helpers';
import {TRANSFORM_LABEL_UNITS} from '@utils/constants';
interface OrderItemProductProps {
  select?: boolean;
  checked: boolean;
  orderItem: StoreOrderItem;
  onPress?: (item: StoreOrderItem) => void;
}
const OrderItemPurchaseComponent = ({
  onPress,
  select = false,
  checked,
  orderItem,
}: OrderItemProductProps) => {
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark});
  return (
    <Pressable
      onPress={() => onPress && onPress(orderItem)}
      style={[styles.container, flex.row, flex.gap10]}>
      <CardComponent style={[flex.row, flex.flex1, flex.gap10]} transparent>
        {select && (
          <CheckCircleAnimatedComponent
            checked={checked}
            onChecked={() => onPress && onPress(orderItem)}
          />
        )}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: BASE_URL + orderItem.medical_id.images[0].path,
            }}
            style={styles.image}
          />
        </View>
        <View style={[flex.flex1, flex.gap4]}>
          <TextNormalComponent numberOfLines={2}>
            {orderItem.medical_id.name}
          </TextNormalComponent>
          <View
            style={[
              flex.row,
              flex.justifyContentBetween,
              flex.alignItemsCenter,
            ]}>
            <TextNormalComponent fontWeight="500" variant="primary">
              {orderItem.price.toLocaleString('VN')} đ
            </TextNormalComponent>
            <TextNormalComponent>
              x{orderItem.quantity} {TRANSFORM_LABEL_UNITS[orderItem.unit]}
            </TextNormalComponent>
          </View>
        </View>
      </CardComponent>
    </Pressable>
  );
};

export default memo(OrderItemPurchaseComponent);
const styling = ({colors}: StyleSheetProps) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    image: {
      width: hp(5),
      height: hp(5),
      borderRadius: hp(0.8),
    },
    imageContainer: {
      width: hp(5),
      height: hp(5),
      borderRadius: hp(0.8),
      borderColor: colors.border,
      borderWidth: 1,
    },
  });
