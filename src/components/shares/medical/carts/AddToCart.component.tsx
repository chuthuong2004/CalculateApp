import {View, StyleSheet, TextInput, Image, Pressable} from 'react-native';
import React, {memo, useEffect, useMemo, useState} from 'react';

// ** Share components
import {
  AppVectorIcons,
  BottomSheetComponent,
  ButtonComponent,
  HeadingSheetComponent,
  TextNormalComponent,
  CardBottomComponent,
} from '@components/shares';

// ** Constants
import {ICON, TRANSFORM_LABEL_UNITS} from '@utils/constants';

// ** Navigation hooks
import {useTheme} from '@react-navigation/native';

// ** Global styles
import {spacing, flex} from '@styles';

// ** Types
import {StyleSheetProps} from '@/types/commons';
import {useAppDispatch, useAppSelector} from '@/store';
import {setToast, setSelectedProduct} from '@/store/actions';
import {selectCart} from '@/store/selectors';
import {BASE_URL} from '@config/baseUrl';
import {useCart} from '@hooks/services';
import {hp} from '@utils/helpers';

const AddToCartComponent = () => {
  const {selectedProduct, cartItems} = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [activeUnit, setActiveUnit] = useState(
    selectedProduct?.units.find(item => item.can_sell),
  );
  const {loading: loadingCart, onAddToCart} = useCart();

  useEffect(() => {
    if (selectedProduct) {
      setActiveUnit(selectedProduct?.units.find(item => item.can_sell));
    }
  }, [selectedProduct]);

  const quantityValid = useMemo(() => {
    if (activeUnit) {
      const cartItemFound = cartItems.find(
        item =>
          item.medical_id._id === selectedProduct?._id &&
          item.unit === activeUnit.unit,
      );
      if (cartItemFound) {
        return activeUnit.total_quantity - cartItemFound.quantity;
      }
      return activeUnit.total_quantity;
    }
    return 0;
  }, [activeUnit, cartItems, selectedProduct]);
  const handlePlus = () => {
    setQuantity(prev => {
      if (activeUnit) {
        if (prev >= quantityValid) {
          return prev;
        }
        return prev + 1;
      }
      return prev;
    });
  };
  const handleMinus = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity(prev => (prev > 1 ? prev - 1 : prev));
  };
  const toggleSheet = () => {
    setQuantity(1);
    dispatch(setSelectedProduct(null));
  };
  const handleAddToCart = () => {
    if (
      selectedProduct &&
      activeUnit &&
      quantity !== 0 &&
      quantity <= quantityValid
    ) {
      onAddToCart(
        {
          medical_id: selectedProduct._id,
          unit: activeUnit?.unit,
          quantity: quantity,
        },
        () => {
          dispatch(
            setToast({
              toast: 'Đã thêm sản phẩm vào giỏ hàng thành công !',
              variant: 'success',
            }),
          );
          setQuantity(1);
          toggleSheet();
        },
        ({message}) => {
          dispatch(
            setToast({
              toast: message,
              variant: 'danger',
            }),
          );
          console.log(message);
        },
      );
    }
  };
  const price = useMemo(() => {
    return activeUnit?.export_price ? quantity * activeUnit?.export_price : 0;
  }, [quantity, activeUnit]);
  const {colors, dark} = useTheme();
  const styles = styling({colors, dark});

  console.log('quantityValid: ', quantityValid);

  return selectedProduct ? (
    <BottomSheetComponent toggleSheet={toggleSheet}>
      <HeadingSheetComponent
        title="Choose quantity, unit"
        onCloseSheet={toggleSheet}
      />
      <View style={[spacing('padding').top, flex.gap10]}>
        {/* Thông tin thuốc */}
        <View
          style={[
            flex.row,
            flex.gap10,
            flex.alignItemsCenter,
            spacing('padding').horizontal,
          ]}>
          <Image
            source={{
              uri: BASE_URL + selectedProduct.images[0].path,
            }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          />
          <View style={[flex.flex1, flex.gap10]}>
            <TextNormalComponent>{selectedProduct.name}</TextNormalComponent>
            <View style={[flex.row, flex.gap4]}>
              <TextNormalComponent variant="primary">
                {activeUnit?.export_price.toLocaleString('vi')}đ
              </TextNormalComponent>
              <TextNormalComponent variant="primary">/</TextNormalComponent>
              <TextNormalComponent variant="primary">
                {TRANSFORM_LABEL_UNITS[activeUnit?.unit || '']}
              </TextNormalComponent>
            </View>
          </View>
        </View>
        {/* Đơn vị */}
        <View style={[flex.gap10, spacing('padding').horizontal]}>
          <TextNormalComponent>Đơn vị</TextNormalComponent>
          <View style={[flex.row, flex.gap10]}>
            {selectedProduct?.units.map(unit => {
              if (
                unit.unit === 'ML' ||
                unit.unit === 'GRAM' ||
                !unit.can_sell
              ) {
                return null;
              }
              return (
                <ButtonComponent
                  key={unit._id}
                  onPress={() => {
                    setActiveUnit(unit);
                    setQuantity(1);
                  }}
                  spacingHorizontal={hp(2)}
                  rounded
                  size="sm"
                  color="secondary"
                  outline={activeUnit?._id === unit._id}>
                  {TRANSFORM_LABEL_UNITS[unit.unit]}
                </ButtonComponent>
              );
            })}
          </View>
        </View>
        {/* Số lượng */}
        <View style={[flex.gap10, spacing('padding').horizontal]}>
          <TextNormalComponent>Số lượng</TextNormalComponent>
          <View style={[flex.row, flex.alignItemsCenter, flex.gap4]}>
            <View style={[flex.row, styles.quantityContainer]}>
              <Pressable
                onPress={handleMinus}
                style={[styles.icon, styles.iconLeft]}>
                <AppVectorIcons
                  type="AntDesign"
                  name={ICON.AntDesign.minus}
                  size={hp(2)}
                  color={quantity <= 1 ? colors.border : colors.text}
                />
              </Pressable>
              <TextInput
                value={`${quantity > quantityValid ? quantityValid : quantity}`}
                onChangeText={text =>
                  activeUnit &&
                  setQuantity(
                    parseInt(text, 10) > quantityValid
                      ? quantityValid
                      : parseInt(text, 10) > 0
                      ? parseInt(text, 10)
                      : 0,
                  )
                }
                inputMode="numeric"
                style={styles.input}
                editable={quantity !== 0 && quantity < quantityValid}
              />

              <Pressable
                onPress={handlePlus}
                style={[styles.icon, styles.iconRight]}>
                <AppVectorIcons
                  type="AntDesign"
                  name={ICON.AntDesign.plus}
                  size={hp(2)}
                  color={
                    quantity >= quantityValid ? colors.border : colors.text
                  }
                />
              </Pressable>
            </View>
            {quantity === 0 && quantity > quantityValid && (
              <TextNormalComponent size="xs" variant="danger">
                Số lượng không đủ !
              </TextNormalComponent>
            )}
          </View>
        </View>

        {/* Tổng tiền */}
        <View style={[flex.gap10, spacing('padding').horizontal]}>
          <View style={[flex.row, flex.justifyContentBetween]}>
            <TextNormalComponent>Tạm tính</TextNormalComponent>
            <TextNormalComponent fontWeight="500">
              {price.toLocaleString('vi')}đ
            </TextNormalComponent>
          </View>
          <View style={[flex.row, flex.justifyContentBetween]}>
            <TextNormalComponent>Tiết kiệm được</TextNormalComponent>
            <TextNormalComponent>0đ</TextNormalComponent>
          </View>
        </View>
        {/* Button */}
        <CardBottomComponent transparent style={[flex.row, flex.gap10]}>
          <View style={[flex.flex1]}>
            <ButtonComponent
              onPress={handleAddToCart}
              rounded
              color="info"
              loading={loadingCart}
              disabled={loadingCart}>
              Thêm vào giỏ
            </ButtonComponent>
          </View>
          <View style={[flex.flex1]}>
            <ButtonComponent rounded color="primary">
              Mua ngay
            </ButtonComponent>
          </View>
        </CardBottomComponent>
      </View>
    </BottomSheetComponent>
  ) : null;
};

export default memo(AddToCartComponent);
const styling = ({colors}: StyleSheetProps) =>
  StyleSheet.create({
    quantityContainer: {
      borderRadius: hp(5),
      borderWidth: 1,
      borderColor: colors.border,
    },
    icon: {
      padding: hp(0.4),
      justifyContent: 'center',
      paddingHorizontal: hp(0.6),
      borderColor: colors.border,
    },
    iconLeft: {
      borderRightWidth: 1,
    },
    iconRight: {
      borderLeftWidth: 1,
    },
    input: {
      height: hp(2.5),
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: hp(3),
      textAlign: 'center',
      color: colors.text,
    },
  });
