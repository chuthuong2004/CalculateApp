import {StyleSheetProps} from '@/types/commons';
import {StoreCartItem, StoreOrderItem} from '@/types/entities';
import {TextNormalComponent} from '@components/shares';
import {BASE_URL} from '@config/baseUrl';
import {useTheme} from '@react-navigation/native';
import {flex} from '@styles';
import {TRANSFORM_LABEL_UNITS} from '@utils/constants';
import React, {memo, useMemo} from 'react';
import {Image, StyleSheet, View, ViewProps} from 'react-native';
import {hp} from '@utils/helpers';

type OrderItemProductProps = Pick<ViewProps, 'style'> &
  (
    | {
        orderItem: StoreCartItem;
        isCart: true;
      }
    | {
        orderItem: StoreOrderItem;
        isCart: false;
      }
  );
const OrderItemProductComponent = ({
  style,
  orderItem,
  isCart,
}: OrderItemProductProps) => {
  console.log(orderItem);

  const orderUnit = useMemo(() => {
    return orderItem.medical_id.units.find(
      item => item.unit === orderItem.unit,
    );
  }, [orderItem]);
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark});
  return (
    <View style={[styles.container, flex.row, flex.gap10, style]}>
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
          style={[flex.row, flex.justifyContentBetween, flex.alignItemsCenter]}>
          <TextNormalComponent fontWeight="500">
            {isCart
              ? Number(orderUnit?.export_price).toLocaleString('VN')
              : orderItem.price?.toLocaleString('VN')}{' '}
            đ
          </TextNormalComponent>
          <TextNormalComponent>
            x{orderItem.quantity} {TRANSFORM_LABEL_UNITS[orderItem.unit]}
          </TextNormalComponent>
        </View>
      </View>
    </View>
  );
};

export default memo(OrderItemProductComponent);
const styling = ({colors}: StyleSheetProps) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderBottomColor: colors.border,
      borderBottomWidth: StyleSheet.hairlineWidth,
      paddingBottom: hp(1),
    },
    image: {
      width: hp(5),
      height: hp(5),
      borderRadius: hp(0.8),
    },
    imageContainer: {
      borderRadius: hp(0.8),
      borderColor: colors.border,
      borderWidth: 1,
    },
  });
