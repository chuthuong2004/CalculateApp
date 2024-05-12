import {Swipeable} from 'react-native-gesture-handler';

import React, {memo, useRef, useState} from 'react';

// ** Types
import {StoreCategory} from '@/types/entities';

// ** Share components
import {
  AlertComponent,
  CategoryItemManagementComponent,
  RightActionComponent,
} from '@components/shares';
import {Nullable} from '@/types/commons';

// ** Custom hooks
import {useCategory} from '@hooks';

// ** Redux
import {useAppDispatch} from '@/store/index';

// ** Actions
import {setToast} from '@/store/actions';

type CategoryItemManagementProps = {
  category: StoreCategory;
  onSelectItem: (item: StoreCategory, type: 'Edit' | 'Delete') => void;
};
const SwipeableCategoryItemManagementComponent = ({
  category,
  onSelectItem,
}: CategoryItemManagementProps) => {
  const dispatch = useAppDispatch();
  // ** Ref
  const swipeableRef = useRef<Swipeable | null>(null);
  const {handleDeleteCategory} = useCategory();
  // ** State
  const [deleteItem, setDeleteItem] =
    useState<Nullable<Pick<StoreCategory, '_id' | 'name'>>>(null);

  // ** Handle select item to delete | edit
  const handleSelectItem = (item: StoreCategory, type: 'Edit' | 'Delete') => {
    type === 'Edit' ? onSelectItem(item, type) : setDeleteItem(item);
    swipeableRef.current?.close();
  };

  const handleConfirmDelete = () => {
    if (deleteItem !== null && deleteItem._id === category._id) {
      // ** handle delete with api
      handleDeleteCategory(
        deleteItem._id,
        () => {
          // ** handle delete with state
          setDeleteItem(null);
        },
        ({message}) => {
          setDeleteItem(null);
          dispatch(
            setToast({
              toast: message,
              variant: 'danger',
            }),
          );
        },
      );
    }
  };
  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={() => (
        <RightActionComponent
          subject="Category"
          onPressDelete={() => handleSelectItem(category, 'Delete')}
          onPressEdit={() => handleSelectItem(category, 'Edit')}
        />
      )}>
      <CategoryItemManagementComponent category={category} />
      {deleteItem && (
        <AlertComponent
          show={deleteItem !== null}
          title="Confirm delete?"
          message={`Bạn có chắc chắn muốn xoá danh mục [${deleteItem?.name}] ? Bạn sẽ không thể khôi phục lại danh mục này.`}
          cancelText="Confirm"
          confirmText="Cancel"
          onCancelPressed={handleConfirmDelete}
          onConfirmPressed={() => setDeleteItem(null)}
          onDismiss={() => setDeleteItem(null)}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
        />
      )}
    </Swipeable>
  );
};

export default memo(SwipeableCategoryItemManagementComponent);
