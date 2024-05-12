import {Swipeable} from 'react-native-gesture-handler';

import React, {memo, useCallback, useRef, useState} from 'react';
import {Nullable} from '@/types/commons';
import {StoreAccount} from '@/types/entities';
import {AlertComponent} from '@components/shares/alerts';
import {RightActionComponent} from '@components/shares/swipeable';
import CustomerItemComponent from './CustomerItemManagement.component';
import {useNavigation} from '@react-navigation/native';
import {CustomerStackScreenProps} from '@navigation/app/hospital/customer-management/types';

type SwipeableCustomerItemProps = {
  customer: StoreAccount;
  onSelectItem: (
    customers: StoreAccount[],
    type: 'Edit' | 'SendDiscount',
  ) => void;
  onLongPress: (item: StoreAccount) => void;
  showSelect: boolean;
  onCheckedItem: (item: StoreAccount) => void;
  isChecked: boolean;
};
const SwipeableCustomerItemComponent = ({
  customer,
  onSelectItem,
  showSelect,
  onLongPress,
  onCheckedItem,
  isChecked,
}: SwipeableCustomerItemProps) => {
  // ** Navigation
  const navigation =
    useNavigation<CustomerStackScreenProps<'CustomerDetails'>['navigation']>();

  // ** Ref
  const swipeableRef = useRef<Swipeable | null>(null);

  // ** State
  const [deleteItem, setDeleteItem] = useState<Nullable<StoreAccount>>(null);

  // ** Handle select item to delete | edit
  const handleSelectItem = (
    item: StoreAccount,
    type: 'Edit' | 'SendDiscount' | 'Delete',
  ) => {
    type === 'Delete' ? setDeleteItem(item) : onSelectItem([item], type);
    swipeableRef.current?.close();
  };
  const handleCheckedLeft = useCallback(
    () => onCheckedItem(customer),
    [onCheckedItem, customer],
  );

  const handleConfirmDelete = () => {
    if (deleteItem !== null && deleteItem._id === customer._id) {
      // ** handle delete with state
      setDeleteItem(null);
    }
  };
  const goToDetails = () => {
    navigation.navigate('CustomerDetails', {
      id: '1',
    });
  };
  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={() => (
        <RightActionComponent
          subject="Discount"
          onPressDelete={() => handleSelectItem(customer, 'Delete')}
          onPressEdit={() => handleSelectItem(customer, 'Edit')}
          onSendDiscount={() => handleSelectItem(customer, 'SendDiscount')}
        />
      )}>
      <CustomerItemComponent
        showSelect={false}
        onPress={goToDetails}
        customer={customer}
        onLongPress={onLongPress}
        selectIcon={showSelect}
        onCheckedLeft={handleCheckedLeft}
        checked={isChecked}
      />
      <AlertComponent
        show={deleteItem !== null}
        title="Confirm delete?"
        message={`Bạn có chắc chắn muốn xoá khách hàng [${
          deleteItem?.full_name.first + ' ' + deleteItem?.full_name.last
        }] ? Bạn sẽ không thể khôi phục lại khách hàng này.`}
        cancelText="Confirm"
        confirmText="Cancel"
        onCancelPressed={handleConfirmDelete}
        onConfirmPressed={() => setDeleteItem(null)}
        onDismiss={() => setDeleteItem(null)}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
      />
    </Swipeable>
  );
};

export default memo(SwipeableCustomerItemComponent);
