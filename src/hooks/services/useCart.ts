import {setCartItems} from '@/store/actions';
import {useAppDispatch} from '@/store/index';
import {StoreCart, StoreCartItem} from '@/types/entities';
import {ErrCallbackType} from '@hooks/types';
import {cartService} from '@services/medical';
import {ParamAddToCart} from '@services/types';
import {handleErrorHooks} from '@utils/utilities';
import {useCallback, useState} from 'react';

export function useCart() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  //   ** handle add item to cart
  const handleAddToCart = useCallback(
    async (
      params: ParamAddToCart,
      successCallback: (cart: StoreCart) => void,
      errCallback?: ErrCallbackType,
    ) => {
      setLoading(true);
      try {
        const added = await cartService.addToCart(params);
        console.log(
          'addred: ',
          added.cart_items.map(item => item._id),
        );

        if (added) {
          dispatch(setCartItems(added.cart_items));
          successCallback(added);
        }
      } catch (error) {
        handleErrorHooks(error, errCallback);
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );

  const handleRemoveItemFromCart = useCallback(
    async (
      cartItemId: string,
      successCallback: () => void,
      errCallback?: ErrCallbackType,
    ) => {
      setLoading(true);
      try {
        console.log('CartID:', cartItemId);

        const removeItem = await cartService.removeItemFromCart(cartItemId);
        if (removeItem) {
          dispatch(setCartItems(removeItem.cart_items));
          successCallback();
        }
      } catch (error) {
        handleErrorHooks(error, errCallback);
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );
  const handleUpdateQuantityCart = useCallback(
    async (
      cartItemId: string,
      quantity: number,
      unit: string,
      successCallback: (cartItems: StoreCartItem[]) => void,
      errCallback: ErrCallbackType,
    ) => {
      setLoading(true);
      try {
        const decreased = await cartService.updateQuantity(
          cartItemId,
          quantity,
          unit,
        );
        console.log(decreased.cart_items.map(item => item.quantity));

        if (decreased) {
          dispatch(setCartItems(decreased.cart_items));
          successCallback(decreased.cart_items);
        }
      } catch (error) {
        handleErrorHooks(error, errCallback);
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );
  return {
    loading,
    onAddToCart: handleAddToCart,
    onRemoveItemFromCart: handleRemoveItemFromCart,
    onUpdateQuantityCart: handleUpdateQuantityCart,
  };
}
