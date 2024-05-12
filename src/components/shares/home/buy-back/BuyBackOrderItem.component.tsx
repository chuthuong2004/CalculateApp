import {useAppDispatch} from '@/store';
import {setItemSelectedToRepurchase} from '@/store/actions';
import {StyleSheetProps} from '@/types/commons';
import {StoreOrder} from '@/types/entities';
import {
  ButtonComponent,
  CardComponent,
  TextNormalComponent,
} from '@components/shares';
import {BASE_URL} from '@config/baseUrl';
import {useTheme} from '@react-navigation/native';
import {flex} from '@styles';
import {APP_WIDTH, BREAK_POINT_TABLET} from '@utils/constants';
import {getSizeItemWithGridLayout} from '@utils/utilities';
import moment from 'moment';
import React, {memo} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {hp} from '@utils/helpers';

type BuyBackOrderItemProps = {
  onPress: (order: StoreOrder) => void;
  order: StoreOrder;
};
const BuyBackOrderItemComponent = ({onPress, order}: BuyBackOrderItemProps) => {
  const dispatch = useAppDispatch();
  const handleRepurchase = () => {
    dispatch(setItemSelectedToRepurchase(order.order_items));
  };
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark});
  return (
    <Pressable onPress={() => onPress(order)}>
      <CardComponent
        shadow
        style={[
          flex.gap10,
          {
            width: getSizeItemWithGridLayout(
              hp(1),
              APP_WIDTH > BREAK_POINT_TABLET ? 4 : 2.5,
            ),
          },
        ]}>
        <TextNormalComponent size="sm" fontWeight="500" numberOfLines={1}>
          {order.name ||
            `Đơn hàng ${moment(new Date(order.createdAt)).format(
              'DD/MM/YYYY',
            )}`}
        </TextNormalComponent>
        <View style={[flex.alignItemsCenter]}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri:
                  BASE_URL + order.order_items[0]?.medical_id?.images[0]?.path,
              }}
              style={styles.image}
            />
            {order.order_items.length > 1 && (
              <View style={styles.totalImage}>
                <TextNormalComponent variant="dark" fontWeight="500">
                  +{order.order_items.length - 1}
                </TextNormalComponent>
              </View>
            )}
          </View>
        </View>
        <View style={[flex.row]}>
          <View style={styles.totalItem}>
            <TextNormalComponent variant="dark" size="sm" fontWeight="500">
              {order.order_items.length} sản phẩm
            </TextNormalComponent>
            <View style={styles.rectangle} />
          </View>
        </View>
        <TextNormalComponent fontWeight="500">
          {order.pricing.total_price.toLocaleString('VN')} đ
        </TextNormalComponent>
        <View>
          <ButtonComponent
            onPress={handleRepurchase}
            rounded
            color="info"
            size="sm">
            Buy back
          </ButtonComponent>
        </View>
      </CardComponent>
    </Pressable>
  );
};

export default memo(BuyBackOrderItemComponent);

const styling = ({colors, dark}: StyleSheetProps) =>
  StyleSheet.create({
    imageContainer: {
      borderRadius: 8,
      borderWidth: 1,
      width: hp(7.5),
      height: hp(8),
      borderColor: colors.border,
    },
    image: {width: '100%', height: '100%', borderRadius: 8},
    totalImage: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: dark ? '#21212190' : '#50505090',
      borderRadius: 3,
      padding: 4,
    },
    totalItem: {
      backgroundColor: dark ? '#464f59' : '#666666',
      paddingRight: 15,
      paddingLeft: 10,
      paddingVertical: 4,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      borderTopLeftRadius: 2,
      transform: [{translateX: -15}],
    },
    rectangle: {
      position: 'absolute',
      borderWidth: 2,
      left: 0,
      bottom: -4,
      borderRightColor: dark ? '#464f59' : '#1c1c1c',
      borderTopColor: dark ? '#464f59' : '#1c1c1c',
      borderLeftColor: colors.background,
      borderBottomColor: colors.background,
    },
  });
