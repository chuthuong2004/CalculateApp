import React, {memo, useEffect} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

// ** Share components
import {
  BottomSheetComponent,
  ButtonComponent,
  CardBottomComponent,
  HeadingSheetComponent,
} from '@components/shares';
import OrderItemPurchaseComponent from './OrderItemPurchase.component';

// ** Constants

// ** Global styles
import {flex, spacing} from '@styles';

// ** Redux
import {useAppDispatch, useAppSelector} from '@/store';

// ** Slices
import {
  setItemCartSelected,
  setItemSelectedToRepurchase,
  setToast,
} from '@/store/actions';
import {selectCart} from '@/store/selectors';
import {useCart} from '@hooks/services';
import {useCheckedCard} from '@hooks/utils';
import {NavigationService} from '@utils/background-service';

let isAddToCartClicked = false;
const RepurchaseComponent = () => {
  const {itemSelectedToRepurchase} = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  const {loading, onAddToCart} = useCart();
  const {
    listItemSelected,
    handleCheckedItem,
    handleToggleAll,
    handleCancelSelected,
  } = useCheckedCard(itemSelectedToRepurchase);
  useEffect(() => {
    if (itemSelectedToRepurchase.length > 0) {
      handleToggleAll();
    }
  }, [itemSelectedToRepurchase, handleToggleAll]);
  const toggleSheet = () => {
    handleCancelSelected();
    dispatch(setItemSelectedToRepurchase([]));
  };
  const handleAddToCart = () => {
    isAddToCartClicked = true;
    for (let i = 0; i < listItemSelected.length; i++) {
      const item = listItemSelected[i];
      onAddToCart(
        {
          medical_id: item.medical_id._id,
          quantity: item.quantity,
          unit: item.unit,
        },
        () => {
          if (i === listItemSelected.length - 1) {
            toggleSheet();
            dispatch(
              setToast({
                toast: 'Đã thêm sản phẩm vào giỏ hàng thành công !',
                variant: 'success',
              }),
            );
            isAddToCartClicked = false;
          }
        },
        ({message}) => {
          console.log(message);
        },
      );
    }
  };
  const handleBuyNow = () => {
    for (let i = 0; i < listItemSelected.length; i++) {
      const item = listItemSelected[i];
      onAddToCart(
        {
          medical_id: item.medical_id._id,
          quantity: item.quantity,
          unit: item.unit,
        },
        cart => {
          if (i === listItemSelected.length - 1) {
            toggleSheet();
            dispatch(setItemCartSelected(cart.cart_items));
            NavigationService.navigate('HomeStack', {
              screen: 'CartStack',
              params: {
                screen: 'Checkout',
                params: {
                  repository: null,
                },
              },
            });
          }
        },
        ({message}) => {
          console.log(message);
        },
      );
    }
  };
  console.log('LIST REPURCHARSE: ', listItemSelected);

  return itemSelectedToRepurchase.length > 0 ? (
    <BottomSheetComponent toggleSheet={toggleSheet}>
      <View style={[flex.flex1]}>
        <HeadingSheetComponent
          title="Select the product to buy back"
          onCloseSheet={toggleSheet}
        />
        <ScrollView showsVerticalScrollIndicator={false} style={[flex.flex1]}>
          <View style={[spacing('padding').around, flex.gap10]}>
            {itemSelectedToRepurchase.map(item => (
              <OrderItemPurchaseComponent
                key={item._id}
                select={itemSelectedToRepurchase.length > 1}
                checked={
                  !!listItemSelected.find(ordItem => ordItem._id === item._id)
                }
                onPress={() => handleCheckedItem(item)}
                orderItem={item}
              />
            ))}
          </View>
        </ScrollView>
        <CardBottomComponent>
          <View style={[flex.flex1]}>
            <ButtonComponent
              onPress={handleAddToCart}
              loading={loading && isAddToCartClicked}
              disabled={
                (loading && isAddToCartClicked) || listItemSelected.length === 0
              }
              rounded
              color="info">
              Add to cart
            </ButtonComponent>
          </View>
          <View style={[flex.flex1]}>
            <ButtonComponent
              onPress={handleBuyNow}
              rounded
              disabled={
                (loading && !isAddToCartClicked) ||
                listItemSelected.length === 0
              }
              loading={loading && !isAddToCartClicked}>
              Buy now
            </ButtonComponent>
          </View>
        </CardBottomComponent>
      </View>
    </BottomSheetComponent>
  ) : null;
};

export default memo(RepurchaseComponent);
