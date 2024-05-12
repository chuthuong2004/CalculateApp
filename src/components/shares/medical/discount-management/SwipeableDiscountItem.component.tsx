import {Swipeable} from 'react-native-gesture-handler';

import React, {memo, useCallback, useRef, useState} from 'react';
import {Nullable} from '@/types/commons';
import {StoreDiscount} from '@/types/entities';
import {AlertComponent} from '@components/shares/alerts';
import {RightActionComponent} from '@components/shares/swipeable';
import DiscountItemComponent from './DiscountItem.component';
import {useNavigation} from '@react-navigation/native';
import {DiscountStackScreenProps} from '@navigation/app/discount/types';
import {spacing} from '@styles/spacing.style';
import {useDiscount} from '@hooks/services';
import {useSWRConfig} from 'swr';

type SwipeableDiscountItemProps = {
  discount: StoreDiscount;
  onSelectItem: (
    discounts: StoreDiscount[],
    type: 'Edit' | 'SendDiscount',
  ) => void;
  onLongPress: (item: StoreDiscount) => void;
  showSelect: boolean;
  onCheckedItem: (item: StoreDiscount) => void;
  isChecked: boolean;
};
const SwipeableDiscountItemComponent = ({
  discount,
  onSelectItem,
  isChecked,
  showSelect,
  onCheckedItem,
  onLongPress,
}: SwipeableDiscountItemProps) => {
  const {mutate} = useSWRConfig();
  // ** Navigation
  const navigation =
    useNavigation<DiscountStackScreenProps<'DiscountDetails'>['navigation']>();

  // ** Ref
  const swipeableRef = useRef<Swipeable | null>(null);
  const {onDeleteDiscount} = useDiscount();

  // ** State
  const [deleteItem, setDeleteItem] = useState<Nullable<StoreDiscount>>(null);

  // ** Handle select item to delete | edit
  const handleSelectItem = (
    item: StoreDiscount,
    type: 'Edit' | 'SendDiscount' | 'Delete',
  ) => {
    type === 'Delete' ? setDeleteItem(item) : onSelectItem([item], type);
    swipeableRef.current?.close();
  };

  const handleCheckedLeft = useCallback(
    () => onCheckedItem(discount),
    [onCheckedItem, discount],
  );

  const handleConfirmDelete = () => {
    if (deleteItem !== null && deleteItem._id === discount._id) {
      // ** handle delete with state
      onDeleteDiscount(
        deleteItem._id,
        () => {
          setDeleteItem(null);
          mutate('DiscountList');
        },
        ({message}) => {
          console.log(message);
        },
      );
    }
  };
  const goToDetails = () => {
    navigation.navigate('DiscountDetails', {
      id: discount._id,
      name: discount.name,
    });
  };
  return (
    <Swipeable
      ref={swipeableRef}
      containerStyle={[
        spacing('padding', 0, 10).bottom,
        spacing('padding').horizontal,
      ]}
      renderRightActions={() => (
        <RightActionComponent
          subject="Discount"
          onPressDelete={() => handleSelectItem(discount, 'Delete')}
          onPressEdit={() => {
            navigation.navigate('FormDiscount', {id: discount._id});
            swipeableRef.current?.close();
          }}
          onSendDiscount={() => handleSelectItem(discount, 'SendDiscount')}
        />
      )}>
      <DiscountItemComponent
        showSelect={false}
        onPress={goToDetails}
        discount={discount}
        onLongPress={onLongPress}
        selectIcon={showSelect}
        onCheckedLeft={handleCheckedLeft}
        checked={isChecked}
      />
      <AlertComponent
        show={deleteItem !== null}
        title="Confirm delete?"
        message={`Bạn có chắc chắn muốn xoá chiết khấu [${deleteItem?.name}] ? Bạn sẽ không thể khôi phục lại chiết khấu này.`}
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

export default memo(SwipeableDiscountItemComponent);
