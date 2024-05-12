import {View} from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {flex} from '@styles/flex.style';
import {TextNormalComponent} from '../text';
import {ButtonComponent} from '../button';
import {useNavigation} from '@react-navigation/native';
import {CartStackScreenPropsComposite} from '@navigation/app/cart/types';
import {spacing} from '@styles/spacing.style';

const CartEmptyComponent = () => {
  const navigation =
    useNavigation<
      CartStackScreenPropsComposite<'Cart', 'ProductStack'>['navigation']
    >();
  return (
    <View style={[flex.widthFull, flex.flex1, flex.alignItemsCenter]}>
      <View style={[flex.alignItemsCenter, spacing('margin', 0, 50).bottom]}>
        <AnimatedLottieView
          source={require('@assets/lottie/carts/cart-empty.icon.json')}
          autoPlay
          style={{
            width: '100%',
            height: 200,
          }}
          loop
        />
        <TextNormalComponent>
          Chưa có sản phẩm nào trong giỏ hàng
        </TextNormalComponent>
      </View>
      <ButtonComponent
        rounded
        spacingHorizontal={60}
        onPress={() =>
          navigation.navigate('ProductStack', {
            screen: 'ProductOfCategory',
            params: {
              name: '',
              _id: '',
            },
          })
        }>
        Mua hàng
      </ButtonComponent>
    </View>
  );
};

export default CartEmptyComponent;
