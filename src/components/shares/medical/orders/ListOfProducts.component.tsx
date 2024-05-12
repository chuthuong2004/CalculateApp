import {View, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import {
  CollapsibleComponent,
  OrderItemProductComponent,
  TextNormalComponent,
} from '@components/shares';
import {useTheme} from '@react-navigation/native';
import {useToggle} from '@hooks';
import {flex, spacing} from '@styles';
import {StoreCartItem, StoreOrderItem} from '@/types/entities';

type ListOfProductsProps = {
  orderItems: StoreCartItem[] | StoreOrderItem[];
};
const ListOfProductsComponent = ({orderItems}: ListOfProductsProps) => {
  const {colors} = useTheme();
  const {isOpen: viewAll, toggle: toggleViewAll} = useToggle(false);
  return (
    <View style={[flex.gap10]}>
      <View style={[spacing('padding').top, spacing('padding').horizontal]}>
        <TextNormalComponent fontWeight="500">
          Danh sách sản phẩm ({orderItems.length})
        </TextNormalComponent>
      </View>
      <View
        style={[
          spacing('padding').around,
          {
            backgroundColor: colors.card,
          },
          flex.gap10,
        ]}>
        {orderItems.slice(0, 2).map(item => (
          <OrderItemProductComponent key={item._id} orderItem={item} isCart />
        ))}
        {orderItems.length > 2 && (
          <CollapsibleComponent expanded={viewAll}>
            <View style={[flex.gap10]}>
              {orderItems.slice(2).map(item => (
                <OrderItemProductComponent
                  key={item._id}
                  orderItem={item}
                  isCart
                />
              ))}
            </View>
          </CollapsibleComponent>
        )}

        {orderItems.length > 2 && (
          <View style={[flex.alignItemsEnd]}>
            <TouchableOpacity onPress={toggleViewAll}>
              <TextNormalComponent size="sm" variant="primary">
                {viewAll ? 'Collapse' : 'View more'}
              </TextNormalComponent>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default memo(ListOfProductsComponent);
