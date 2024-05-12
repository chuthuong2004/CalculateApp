import {
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import React, {memo, useMemo} from 'react';

// ** Hooks
import {useTheme} from '@react-navigation/native';

// ** Share Components
import {
  AnimatedIconHeartComponent,
  BadgeComponent,
  ButtonComponent,
  TextNormalComponent,
} from '@components/shares';

// ** Types
import {StyleSheetProps} from '@/types/commons';

// ** Global styles
import {SHADOW_STYLE, flex, spacing} from '@styles';

// ** Constants
import {COLORS_APP, TRANSFORM_LABEL_UNITS} from '@utils/constants';

// ** Reanimated
import Animated, {ZoomIn} from 'react-native-reanimated';

// ** Slices
import {handleFavorite, setSelectedProduct} from '@/store/actions';
import {useAppDispatch, useAppSelector} from '@/store';
import {StoreMedicine} from '@/types/entities';
import {BASE_URL} from '@config/baseUrl';
import {selectMedicineFavorites, selectUser} from '@/store/selectors';
import {isCustomer, isProvider} from '@utils/utilities';
import {hp} from '@utils/helpers';

interface ProductItemMedicalProps extends TouchableWithoutFeedbackProps {
  showButtonBuy?: boolean;
  product: StoreMedicine;
}
const ProductItemMedical = ({
  product,
  ...passProps
}: ProductItemMedicalProps) => {
  const {user} = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const medicinesHearted = useAppSelector(selectMedicineFavorites);
  const isHearted = useMemo(
    () => !!medicinesHearted.find(item => item._id === product._id),
    [medicinesHearted, product._id],
  );

  const handleTapHeart = () => {
    dispatch(handleFavorite(product));
  };
  const handleSelectProduct = () => {
    dispatch(setSelectedProduct(product));
  };

  const renderUnit = () => {
    const title = product?.units.map(unit => TRANSFORM_LABEL_UNITS[unit.unit]);
    return product?.units
      .map(
        (unit, index) =>
          `${title?.[index]}${unit.contain ? ` x ${unit.contain}` : ''}`,
      )
      .join(' ');
  };

  const {colors, dark} = useTheme();
  const styles = styling({colors, dark});
  return (
    <Animated.View
      entering={ZoomIn.duration(500)}
      style={[styles.container, SHADOW_STYLE.shadowCard, passProps.style]}>
      <View>
        <Animated.Image
          entering={ZoomIn}
          style={styles.image}
          source={{
            uri: BASE_URL + product?.images[0].path,
          }}
          resizeMode="contain"
        />
        <View style={[styles.discount]}>
          <TextNormalComponent variant="dark" size="xs">
            -20%
          </TextNormalComponent>
        </View>
        <TouchableOpacity onPress={handleTapHeart}>
          <AnimatedIconHeartComponent hearted={isHearted} outline />
        </TouchableOpacity>
        <View style={styles.category}>
          <TextNormalComponent variant="primary" size="xs">
            {product.category_id?.name}
          </TextNormalComponent>
        </View>
        <View style={styles.corner} />
      </View>
      <View style={[spacing('padding', 0, 10).around, flex.gap4]}>
        <TextNormalComponent fontWeight="500" numberOfLines={2} size="sm">
          {product?.name}
        </TextNormalComponent>
        {product?.units.length > 0 && (
          <TextNormalComponent size="sm" variant="primary">
            {product?.units[0].export_price?.toLocaleString('vi')}đ /{' '}
            {TRANSFORM_LABEL_UNITS[product.units[0].unit]}
          </TextNormalComponent>
        )}
        {product?.units.length > 1 && (
          <View style={[flex.row, flex.wrap]}>
            <BadgeComponent
              variant="info"
              text={renderUnit()}
              size="sm"
              style={[flex.flex1]}
            />
          </View>
        )}
        {isProvider(user) && (
          <View style={[flex.row, flex.alignItemsEnd, flex.gap4]}>
            <TextNormalComponent size="xs">Đã bán</TextNormalComponent>
            <TextNormalComponent size="sm">
              {product &&
                product.units[0].stores.reduce(
                  (acc, store) =>
                    store.quantity_sold ? acc + store.quantity_sold : acc,
                  0,
                )}{' '}
              Hộp
            </TextNormalComponent>
          </View>
        )}
      </View>
      {passProps.showButtonBuy && isCustomer(user) && (
        <View
          style={[
            spacing('padding', 0, 10).horizontal,
            spacing('padding', 0, 10).bottom,
          ]}>
          <ButtonComponent onPress={handleSelectProduct} rounded>
            Chọn mua
          </ButtonComponent>
        </View>
      )}
    </Animated.View>
  );
};

export default memo(ProductItemMedical);

const styling = ({colors}: StyleSheetProps) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: 8,
      gap: 4,
    },
    image: {
      width: '100%',
      height: hp(15),
      borderTopRightRadius: hp(0.8),
      borderTopLeftRadius: hp(0.8),
    },
    iconHeart: {
      position: 'absolute',
      right: 2,
      bottom: 2,
      borderRadius: 50,
      padding: 2,
    },
    activeHeart: {
      position: 'absolute',
      top: 2,
      left: 2,
      zIndex: 1,
    },
    discount: {
      position: 'absolute',
      backgroundColor: COLORS_APP.danger,
      padding: 4,
      borderTopLeftRadius: 8,
      borderBottomRightRadius: 8,
    },
    category: {
      position: 'absolute',
      bottom: 0,
      left: -4,
      backgroundColor: '#d8dfeb',
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      borderTopLeftRadius: 2,
    },
    corner: {
      position: 'absolute',
      borderWidth: 2,
      left: -4,
      bottom: -4,
      borderRightColor: colors.primary,
      borderTopColor: colors.primary,
      borderLeftColor: colors.background,
      borderBottomColor: colors.background,
    },
  });
