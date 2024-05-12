import {View} from 'react-native';
import React from 'react';
import {flex, spacing} from '@styles';
import {APP_WIDTH} from '@utils/constants';
import {SkeletonComponent} from '@components/shares';
import CartItemSkeleton from './CartItem.skeleton';
import CartBottomSkeleton from './CartBottom.skeleton';

const CartSkeleton = () => {
  return (
    <View style={[flex.flex1, flex.widthFull]}>
      <View style={[flex.flex1, flex.gap10, spacing('padding').around]}>
        <SkeletonComponent width={APP_WIDTH / 3} height={25} radius={4} />
        <CartItemSkeleton />
        <CartItemSkeleton />
        <CartItemSkeleton />
      </View>
      <CartBottomSkeleton />
    </View>
  );
};

export default CartSkeleton;
