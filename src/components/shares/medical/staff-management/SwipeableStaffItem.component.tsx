import {Nullable} from '@/types/commons';
import {StoreBaseUser} from '@/types/entities';
import {AlertComponent} from '@components/shares/alerts';
import {RightActionComponent} from '@components/shares/swipeable';
import React, {memo, useCallback, useRef, useState} from 'react';
import {Swipeable, SwipeableProps} from 'react-native-gesture-handler';
import StaffItemComponent from './StaffItem.component';

type SelectAction = 'Edit' | 'Delete' | 'Block';
type DeleteState = {
  action: Omit<SelectAction, 'Edit'>;
  info: StoreBaseUser;
};

type SwipeableStaffItemProps = Pick<SwipeableProps, 'containerStyle'> & {
  data: StoreBaseUser;
  onSelectItem: (item: StoreBaseUser) => void;
};
const SwipeableStaffItemComponent = ({
  onSelectItem,
  data,
  containerStyle,
}: SwipeableStaffItemProps) => {
  // ** Ref
  const swipeableRef = useRef<Swipeable | null>(null);

  // ** State
  const [deleteState, setDeleteState] = useState<Nullable<DeleteState>>(null);
  // ** Handle select item to delete | edit
  const handleSelectItem = useCallback(
    (item: StoreBaseUser, type: SelectAction) => {
      type === 'Edit'
        ? onSelectItem(item)
        : setDeleteState({
            action: type,
            info: item,
          });
      swipeableRef.current?.close();
    },
    [onSelectItem],
  );

  const handleConfirmDelete = () => {
    if (deleteState?.action === 'Delete') {
      // ! handle delete account -- soft delete
    } else if (deleteState?.action === 'Block') {
      // ! handle block account
    }
  };
  const renderRightActions = useCallback(
    () => (
      <RightActionComponent
        subject="User"
        onPressDelete={() => handleSelectItem(data, 'Delete')}
        onPressBlock={() => handleSelectItem(data, 'Block')}
        onPressRole={() => handleSelectItem(data, 'Edit')}
      />
    ),
    [handleSelectItem, data],
  );
  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      containerStyle={containerStyle}>
      <StaffItemComponent data={data} />
      <AlertComponent
        show={deleteState !== null}
        title={`Confirm ${
          deleteState?.action === 'Delete' ? 'delete' : 'block account'
        }?`}
        message={`Bạn có chắc chắn muốn ${
          deleteState?.action === 'Delete' ? 'xoá' : 'khoá'
        } tài khoản [${
          deleteState?.info.account_id.full_name.first +
          ' ' +
          deleteState?.info.account_id.full_name.last
        }] ? Bạn sẽ không thể khôi phục lại tài khoản này.`}
        cancelText="Confirm"
        confirmText="Cancel"
        onCancelPressed={handleConfirmDelete}
        onConfirmPressed={() => setDeleteState(null)}
        onDismiss={() => setDeleteState(null)}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
      />
    </Swipeable>
  );
};

export default memo(SwipeableStaffItemComponent);
