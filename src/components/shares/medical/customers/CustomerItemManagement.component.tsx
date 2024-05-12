import {View, Pressable} from 'react-native';
import React, {memo} from 'react';

// ** Constants
import {COLORS_APP} from '@utils/constants';

// ** Types
import {StoreAccount} from '@/types/entities';

// ** Global Styles
import {flex} from '@styles';

// ** Share components
import {
  AppVectorIcons,
  AvatarComponent,
  BadgeComponent,
  CardComponent,
  CheckCircleAnimatedComponent,
  TextNormalComponent,
} from '@components/shares';
import {SelectType} from '@/types/commons';
import {hp} from '@utils/helpers';

type CustomerItemProps = SelectType<StoreAccount> & {
  customer: StoreAccount;
  checked: boolean;
};
const CustomerItemManagementComponent = (props: CustomerItemProps) => {
  // ** Rest props
  const {showSelect, customer} = props;

  const handleChecked = () => {
    showSelect ? props.onCheckedItem(props.customer) : props.onCheckedLeft();
  };
  return (
    <Pressable
      onPress={showSelect ? handleChecked : props.onPress}
      onLongPress={!showSelect ? () => props.onLongPress(customer) : undefined}>
      <CardComponent style={[flex.row, flex.gap10]}>
        {!showSelect && props.selectIcon && (
          <CheckCircleAnimatedComponent
            checked={props.checked}
            onChecked={handleChecked}
          />
        )}

        <AvatarComponent
          source={{
            uri: 'https://assetadmin.sgod.vn/images/avatars/1696906279522-584445545-Screenshot_20230802-071513_Facebook.jpg',
          }}
          size="medium"
          rounded
        />
        <View style={[flex.flex1, flex.gap4]}>
          <View
            style={[
              flex.row,
              flex.alignItemsCenter,
              flex.justifyContentBetween,
            ]}>
            <TextNormalComponent fontWeight="500">
              {customer.full_name.first + ' ' + customer.full_name.last}
            </TextNormalComponent>
            <View style={[flex.row, flex.gap10]}>
              <BadgeComponent
                rounded={false}
                text={customer?.type_service}
                variant="info"
                size="sm"
              />
              {showSelect && (
                <CheckCircleAnimatedComponent
                  checked={props.checked}
                  onChecked={handleChecked}
                />
              )}
            </View>
          </View>
          <View style={[flex.row, flex.alignItemsCenter, flex.gap4]}>
            <AppVectorIcons
              type="FontAwesome"
              name="hospital-o"
              size={hp(1.8)}
              color={COLORS_APP.secondary}
            />
            <TextNormalComponent variant="secondary">
              Bệnh Viện Xuyên Á
            </TextNormalComponent>
          </View>
          <View
            style={[
              flex.row,
              flex.justifyContentBetween,
              flex.alignItemsCenter,
            ]}>
            <View style={[flex.row, flex.gap4]}>
              <TextNormalComponent size="sm" variant="secondary">
                Số lần mua:{' '}
              </TextNormalComponent>
              <TextNormalComponent size="sm">20</TextNormalComponent>
            </View>
            <View style={[flex.row, flex.gap4]}>
              <TextNormalComponent size="sm" variant="secondary">
                Tổng tiền
              </TextNormalComponent>
              <TextNormalComponent size="sm" fontWeight="500">
                500.000.000đ
              </TextNormalComponent>
            </View>
          </View>
        </View>
      </CardComponent>
    </Pressable>
  );
};

export default memo(CustomerItemManagementComponent);
