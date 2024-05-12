import {Swipeable} from 'react-native-gesture-handler';

import React, {memo, useRef, useState} from 'react';

// ** Types
import {StoreRepository} from '@/types/entities';
import {Nullable} from '@/types/commons';

// ** Global Styles
import {
  AlertComponent,
  RepositoryItemComponent,
  RightActionComponent,
} from '@components/shares';

// ** Custom hooks
import {useRepository} from '@hooks';
import {useAppDispatch} from '@/store/index';
import {setToast} from '@/store/actions';

interface RepositoryItemProps {
  repository: StoreRepository;
  onSelectItem: (item: StoreRepository, type: 'Edit' | 'Delete') => void;
}
const SwipeableRepositoryItemComponent = ({
  repository,
  onSelectItem,
}: RepositoryItemProps) => {
  // ** SWR Config
  const dispatch = useAppDispatch();
  // ** Custom hook
  const {handleDeleteRepository} = useRepository();

  // ** State
  const [deleteItem, setDeleteItem] =
    useState<Nullable<Pick<StoreRepository, '_id' | 'name'>>>(null);

  // ** Ref
  const swipeableRef = useRef<Swipeable | null>(null);

  // ** Handle select item to delete | edit
  const handleSelectItem = (item: StoreRepository, type: 'Edit' | 'Delete') => {
    type === 'Edit' ? onSelectItem(item, type) : setDeleteItem(item);
    swipeableRef.current?.close();
  };

  const handleConfirmDelete = () => {
    if (deleteItem !== null && deleteItem._id === repository._id) {
      handleDeleteRepository(
        deleteItem?._id,
        () => {
          setDeleteItem(null);
        },
        ({message}) => {
          dispatch(
            setToast({
              toast: message.trim(),
              variant: 'danger',
            }),
          );
          setDeleteItem(null);
        },
      );
    }
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={() => (
        <RightActionComponent
          subject="Store"
          onPressEdit={() => handleSelectItem(repository, 'Edit')}
          onPressDelete={() => handleSelectItem(repository, 'Delete')}
        />
      )}>
      <RepositoryItemComponent repository={repository} />
      {deleteItem && (
        <AlertComponent
          show={deleteItem !== null}
          title="Confirm delete?"
          message={`Bạn có chắc chắn muốn xoá kho [${deleteItem?.name}] ? Bạn sẽ không thể khôi phục lại kho này.`}
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

export default memo(SwipeableRepositoryItemComponent);
