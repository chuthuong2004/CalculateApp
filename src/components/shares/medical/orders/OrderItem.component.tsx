import React, {memo} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';

// ** Share components
import {
  AppVectorIcons,
  ButtonComponent,
  CardComponent,
  TextNormalComponent,
  Translations,
} from '@components/shares';
import {useNavigation, useTheme} from '@react-navigation/native';

// ** Constants
import {COLORS_APP, ICON, TRANSFORM_LABEL_UNITS} from '@utils/constants';

// ** Global styles
import {flex} from '@styles';

// ** Types
import {StyleSheetProps} from '@/types/commons';

// ** Redux
import {useAppDispatch, useAppSelector} from '@/store';
import {
  setContactSupport,
  setItemSelectedToRepurchase,
  setSelectedOrder,
} from '@/store/actions';

// ** Reanimated
import Animated, {FadeInRight, FadeOutLeft} from 'react-native-reanimated';

// ** Custom hooks
import {selectUser} from '@/store/selectors';
import {StoreOrder} from '@/types/entities';
import {ColorType, OrderStatus} from '@/types/unions';
import {BASE_URL} from '@config/baseUrl';
import {useConversation, useOrder} from '@hooks/services';
import {OrderManagementStackScreenProps} from '@navigation/app/order-management/types';
import {getNumberStatus, getTitleStatus} from '@utils/helpers';
import {getStyleColorButton, isCustomer} from '@utils/utilities';
import moment from 'moment';
import {hp} from '@utils/helpers';
import {useSWRConfig} from 'swr';

type OrderItemProps = {
  order: StoreOrder;
  onPress?: (order: StoreOrder) => void;
};
const orderBadge: Record<OrderStatus, ColorType> = {
  pending: 'info',
  confirm: 'info',
  delivering: 'dark',
  delivered: 'warning',
  received: 'primary',
  canceled: 'danger',
};
const OrderItemComponent = ({onPress, order}: OrderItemProps) => {
  const navigation =
    useNavigation<
      OrderManagementStackScreenProps<'OrderManagement'>['navigation']
    >();
  const {mutate} = useSWRConfig();
  const dispatch = useAppDispatch();
  const {onReceiveOrder, loading} = useOrder();
  const {onCreateConversation} = useConversation();
  const {user} = useAppSelector(selectUser);
  const handleRepurchase = () => {
    dispatch(setItemSelectedToRepurchase(order.order_items));
  };
  const handleContact = () => {
    if (isCustomer(user)) {
      dispatch(
        setContactSupport({
          status: 'open',
          callbackChat() {
            onCreateConversation(
              {
                name: '',
                type: 'private',
                members: [order.provider_id._id],
              },
              data => {
                navigation.navigate('ChatStack', {
                  screen: 'Message',
                  params: {
                    conversationId: data._id,
                  },
                });
              },
              ({message}) => {
                console.log(message);
              },
            );
          },
        }),
      );
    } else {
      onCreateConversation(
        {
          name: '',
          type: 'private',
          members: [order.user_id._id],
        },
        data => {
          navigation.navigate('ChatStack', {
            screen: 'Message',
            params: {
              conversationId: data._id,
            },
          });
        },
        ({message}) => {
          console.log(message);
        },
      );
    }
  };
  const handleEditNameOrder = () => {
    dispatch(setSelectedOrder(order));
  };
  const handleImportMedicine = () => {
    navigation.navigate('ImportMedicine', {
      orderId: order.order_id,
      _id: order._id,
    });
  };
  const handleConfirmReceive = () => {
    order &&
      onReceiveOrder(
        order?._id,
        () => {
          mutate(key => typeof key === 'string' && key.startsWith('ListOrder'));
        },
        () => {},
      );
  };
  const renderActions = () => {
    if (isCustomer(user)) {
      if (getNumberStatus(order.order_status) > 3) {
        if (order.order_status === 'delivered') {
          return (
            <ButtonComponent
              onPress={handleConfirmReceive}
              rounded
              loading={loading}
              disabled={loading}
              spacingHorizontal={hp(2)}
              size="sm">
              Đã nhận đơn hàng
            </ButtonComponent>
          );
        }
        if (order.order_status === 'received' && !order.imported) {
          return (
            <ButtonComponent
              onPress={handleImportMedicine}
              rounded
              spacingHorizontal={hp(2)}
              size="sm">
              Nhập hàng vào kho
            </ButtonComponent>
          );
        }
        return (
          <ButtonComponent
            onPress={handleRepurchase}
            rounded
            spacingHorizontal={hp(2)}
            size="sm">
            Repurchase
          </ButtonComponent>
        );
      }
    }

    return (
      <ButtonComponent
        onPress={handleContact}
        rounded
        spacingHorizontal={hp(2)}
        size="sm">
        Contact
      </ButtonComponent>
    );
  };
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark});
  return (
    <Animated.View entering={FadeInRight} exiting={FadeOutLeft}>
      <Pressable onPress={onPress ? () => onPress(order) : undefined}>
        <CardComponent corner={false} style={[flex.gap4]}>
          <View
            style={[
              flex.row,
              flex.alignItemsCenter,
              flex.justifyContentBetween,
            ]}>
            <View style={[flex.row, flex.alignItemsCenter, flex.gap4]}>
              <TextNormalComponent size="sm" fontWeight="600">
                {order.name ||
                  `Đơn hàng ${moment(new Date(order.createdAt)).format(
                    'DD/MM/YYYY',
                  )}`}
              </TextNormalComponent>
              {user?._id === order.user_id._id && (
                <Pressable onPress={handleEditNameOrder}>
                  <AppVectorIcons
                    type="MaterialIcons"
                    name="edit"
                    size={hp(1.6)}
                    color={colors.primary}
                  />
                </Pressable>
              )}
            </View>
            <View style={[flex.row, flex.alignItemsCenter, flex.gap4]}>
              <View
                style={[
                  styles.dot,
                  getStyleColorButton({colors, dark})[
                    order.imported
                      ? 'success'
                      : (orderBadge[order.order_status] as ColorType)
                  ]?.button,
                ]}
              />
              <TextNormalComponent
                variant={
                  order.imported && isCustomer(user)
                    ? 'success'
                    : orderBadge[order.order_status]
                }
                size="sm">
                {order.imported && isCustomer(user)
                  ? 'Đã nhập kho'
                  : getTitleStatus(order.order_status)}
              </TextNormalComponent>
            </View>
          </View>
          <View style={[flex.row, flex.alignItemsCenter, flex.gap10]}>
            <TextNormalComponent variant="secondary" size="sm">
              {order.delivery.method === 'delivery_onsite'
                ? 'Delivery onsite'
                : 'Receive at store'}
            </TextNormalComponent>
            <View style={styles.dotSmall} />
            <TextNormalComponent variant="secondary" size="sm">
              #{order.order_id}
            </TextNormalComponent>
          </View>
          <View style={[flex.row, flex.gap4]}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri:
                    BASE_URL +
                    order.order_items[0]?.medical_id?.images[0]?.path,
                }}
                style={styles.image}
              />
            </View>
            <View style={[flex.flex1, flex.gap4]}>
              <TextNormalComponent numberOfLines={2}>
                {order.order_items[0]?.medical_id?.name}
              </TextNormalComponent>
              <View
                style={[
                  flex.row,
                  flex.justifyContentBetween,
                  flex.alignItemsCenter,
                  flex.gap10,
                ]}>
                <TextNormalComponent size="sm" variant="secondary">
                  {order.order_items[0].price.toLocaleString('VN')} đ
                </TextNormalComponent>
                <TextNormalComponent size="sm" variant="secondary">
                  x{order.order_items[0].quantity}{' '}
                  {TRANSFORM_LABEL_UNITS[order.order_items[0].unit]}
                </TextNormalComponent>
              </View>
              {order.order_items.length > 1 && (
                <TextNormalComponent variant="secondary" size="sm">
                  +{order.order_items.length - 1} sản phẩm khác
                </TextNormalComponent>
              )}
            </View>
          </View>
          <View
            style={[
              flex.row,
              flex.alignItemsCenter,
              flex.justifyContentBetween,
            ]}>
            <View style={[flex.row]}>
              <TextNormalComponent size="sm" variant="primary">
                Xem chi tiết
              </TextNormalComponent>
              <AppVectorIcons
                type="MaterialIcons"
                name={ICON.MaterialIcons.arrowRight}
                size={hp(1.6)}
                color={colors.primary}
              />
            </View>
            <View style={[flex.row, flex.gap4, flex.alignItemsCenter]}>
              <TextNormalComponent variant="secondary" size="sm">
                Thành tiền:
              </TextNormalComponent>
              <TextNormalComponent fontWeight="500" variant="primary">
                {order.pricing.total_price.toLocaleString('VN')} đ
              </TextNormalComponent>
            </View>
          </View>
          <View style={styles.line} />
          <View
            style={[
              flex.row,
              flex.justifyContentBetween,
              flex.alignItemsCenter,
              flex.gap10,
            ]}>
            <View style={[flex.row, flex.gap4, flex.flex1]}>
              {order.reason_canceled && (
                <>
                  <TextNormalComponent size="sm" variant="secondary">
                    Cancellation reason:
                  </TextNormalComponent>
                  <TextNormalComponent
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    size="sm"
                    translate={false}
                    style={[flex.flex1]}>
                    {order.reason_canceled}
                  </TextNormalComponent>
                </>
              )}

              {order.imported && isCustomer(user) && (
                <TextNormalComponent size="sm" variant="info">
                  <Translations text="Entered into warehouse at" />{' '}
                  {moment(new Date(order.imported_at || '')).format(
                    'HH:mm:ss DD/MM/YYYY',
                  )}
                </TextNormalComponent>
              )}
            </View>
            <View style={[flex.row]}>{renderActions()}</View>
          </View>
        </CardComponent>
      </Pressable>
    </Animated.View>
  );
};

export default memo(OrderItemComponent);

const styling = ({colors}: StyleSheetProps) =>
  StyleSheet.create({
    dot: {
      width: hp(0.8),
      height: hp(0.8),
      borderRadius: hp(1),
      backgroundColor: 'red',
    },
    dotSmall: {
      width: hp(0.5),
      height: hp(0.5),
      backgroundColor: COLORS_APP.secondary,
      borderRadius: hp(1),
    },
    imageContainer: {
      borderWidth: 1,
      borderRadius: hp(0.8),
      width: hp(6),
      height: hp(6),
      borderColor: colors.border,
    },
    image: {
      borderRadius: hp(0.8),
      width: '100%',
      height: '100%',
    },
    line: {
      backgroundColor: colors.border,
      marginVertical: hp(0.5),
      height: 1,
    },
  });
