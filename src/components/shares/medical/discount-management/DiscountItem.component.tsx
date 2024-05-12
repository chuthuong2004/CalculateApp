import React, {memo, useMemo} from 'react';
import {Pressable, View} from 'react-native';

// ** Share components
import {
  BadgeComponent,
  CardComponent,
  CheckCircleAnimatedComponent,
  CopyComponent,
  ImageCardComponent,
  TextNormalComponent,
} from '@components/shares';

// ** Global styles
import {flex} from '@styles';

// ** Types
import {StoreDiscount} from '@/types/entities';

// ** Moment JS
import moment from 'moment';

// ** Utilities
import {SelectType} from '@/types/commons';
import {BASE_URL} from '@config/baseUrl';
import {hp} from '@utils/helpers';
import {formatCurrency, getDifferentDay} from '@utils/utilities';

type DiscountItemProps = SelectType<StoreDiscount> & {
  discount: StoreDiscount;
  checked: boolean;
};
const DiscountItemComponent = (props: DiscountItemProps) => {
  const {discount, showSelect, checked} = props;

  const handleChecked = () => {
    showSelect ? props.onCheckedItem(discount) : props.onCheckedLeft();
  };

  const countDate = useMemo(() => {
    return getDifferentDay(new Date(), new Date(discount.end_date));
  }, [discount]);
  let timeString = '';
  if (countDate > 0) {
    timeString = `Hết hạn sau ${countDate} ngày.`;
  } else {
    timeString = `Đã hết hạn ${Math.abs(countDate)} ngày trước.`;
  }

  const isValid =
    getDifferentDay(new Date(), new Date(discount.start_date)) <= 0;

  const renderTimeValid = () => {
    if (!isValid) {
      return `Hiệu lực từ ${moment(new Date(discount.start_date)).format(
        'DD/MM/YYYY',
      )} đến ${moment(new Date(discount.end_date)).format('DD/MM/YYYY')}`;
    }
    return `Hạn sử dụng: ${moment(new Date(discount.end_date)).format(
      'DD/MM/YYYY',
    )}`;
  };
  const renderTitleReduce = () => {
    if (discount.discount_type === 'amount') {
      return `Giảm ${formatCurrency(discount.maximum_discount_amount)}${
        discount.minimum_order_value
          ? ` cho đơn hàng từ ${formatCurrency(discount.minimum_order_value)}`
          : ''
      }`;
    }
    return `Giảm ${discount.percentage}% ${
      discount.maximum_discount_amount
        ? `tối đa ${formatCurrency(discount.maximum_discount_amount)}`
        : ''
    } cho đơn hàng từ ${
      discount.minimum_order_value
        ? formatCurrency(discount.minimum_order_value)
        : '0đ'
    }`;
  };
  return (
    <Pressable
      onPress={showSelect ? handleChecked : props.onPress}
      onLongPress={!showSelect ? () => props.onLongPress(discount) : undefined}>
      <CardComponent shadow style={[flex.gap10, flex.row]}>
        {!showSelect && props.selectIcon && (
          <CheckCircleAnimatedComponent
            checked={checked}
            onChecked={handleChecked}
            variant="danger"
          />
        )}
        <View style={[]}>
          <ImageCardComponent
            source={
              discount.image
                ? {uri: BASE_URL + discount.image.path}
                : require('@assets/images/voucher.png')
            }
            width={hp(7)}
            height={hp(5)}
          />
        </View>
        <View style={[flex.flex1]}>
          <View style={[flex.row, flex.gap10, flex.justifyContentBetween]}>
            <View style={[flex.row, flex.gap4, flex.flex1]}>
              <TextNormalComponent fontWeight="700" textTransform="uppercase">
                {discount.code}
              </TextNormalComponent>
              <CopyComponent code={discount.code} />
            </View>
            {showSelect && (
              <View style={[flex.row, flex.gap10]}>
                <CheckCircleAnimatedComponent
                  checked={checked}
                  onChecked={handleChecked}
                />
              </View>
            )}
          </View>
          <View style={[flex.gap4]}>
            <TextNormalComponent>{discount.name}</TextNormalComponent>
            <View style={[flex.row, flex.alignItemsCenter]}>
              <BadgeComponent
                rounded={false}
                text={renderTitleReduce()}
                variant="info"
                size="sm"
              />
            </View>
            <TextNormalComponent
              variant="secondary"
              fontStyle="italic"
              size="sm">
              {renderTimeValid()}
            </TextNormalComponent>
            {isValid && (
              <View style={[flex.row]}>
                <BadgeComponent
                  rounded={false}
                  size="sm"
                  text={timeString}
                  variant={countDate > 0 ? 'warning' : 'danger'}
                />
              </View>
            )}
          </View>
        </View>
      </CardComponent>
    </Pressable>
  );
};

export default memo(DiscountItemComponent);
