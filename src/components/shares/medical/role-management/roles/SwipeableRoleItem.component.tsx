import {Swipeable} from 'react-native-gesture-handler';

import React, {memo, useCallback, useRef} from 'react';

// ** Navigation hooks
import {useNavigation} from '@react-navigation/native';

// ** Share components
import {RightActionComponent, RoleItemComponent} from '@components/shares';

// ** Types
import {StoreRole} from '@/types/entities';
import {RoleStackScreenPropsComposite} from '@navigation/app/role/types';

type RoleItemProps = {
  role: StoreRole;
  onSelectItem: (item: StoreRole, type: 'Edit' | 'Delete' | 'Role') => void;
};
const RoleItemSwipeableComponent = ({role, onSelectItem}: RoleItemProps) => {
  const navigation =
    useNavigation<
      RoleStackScreenPropsComposite<'Roles', 'HomeStack'>['navigation']
    >();
  const swipeableRef = useRef<Swipeable | null>(null);
  const goToDetails = useCallback(
    () =>
      navigation.push('RoleDetails', {
        id: role._id,
        name: role.name,
      }),
    [navigation, role._id, role.name],
  );
  const handlePressItem = useCallback(
    (type: 'Edit' | 'Delete' | 'Role') => {
      onSelectItem(role, type);
      swipeableRef.current?.close();
    },
    [onSelectItem, role],
  );
  const renderRightActions = useCallback(
    () => (
      <RightActionComponent
        subject="Role"
        onPressEdit={() => handlePressItem('Edit')}
        onPressDelete={() => handlePressItem('Delete')}
        onPressRole={() => handlePressItem('Role')}
      />
    ),
    [handlePressItem],
  );
  return (
    <Swipeable ref={swipeableRef} renderRightActions={renderRightActions}>
      <RoleItemComponent role={role} onPress={goToDetails} />
    </Swipeable>
  );
};

export default memo(RoleItemSwipeableComponent);
