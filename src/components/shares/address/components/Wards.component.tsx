import {Pressable, FlatList} from 'react-native';
import React, {memo, useMemo} from 'react';

// ** Share components
import {TextNormalComponent} from '@components/shares';

// ** Global styles
import {spacing, flex} from '@styles';

// ** Types
import {KeyOfProvince, StoreWard, StoreWardV2} from '@/types/entities';

// ** Utilities
import {removeVietnameseTones} from '@utils';

type WardsV1Props = {
  wards: Array<StoreWard>;
  debounce: string;
  onSelectProvince: (value: string, type: KeyOfProvince) => void;
};
export const WardsComponentV1 = ({
  wards,
  debounce,
  onSelectProvince,
}: WardsV1Props) => {
  const newWards = useMemo(() => {
    return wards.filter(item =>
      removeVietnameseTones(item.name).includes(
        removeVietnameseTones(debounce),
      ),
    );
  }, [debounce, wards]);
  return (
    <FlatList
      ListEmptyComponent={
        <TextNormalComponent size="sm" align="center">
          No matching results found!
        </TextNormalComponent>
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        spacing('padding').around,
        spacing('padding', 0, 80).bottom,
        flex.gap10,
      ]}
      data={newWards}
      renderItem={({item}) => (
        <Pressable onPress={() => onSelectProvince(item.name, 'ward')}>
          <TextNormalComponent
            style={spacing('padding', 0, 5).vertical}
            size="sm">
            {item.name}
          </TextNormalComponent>
        </Pressable>
      )}
      keyExtractor={item => `${item.code}${item.codename}`}
    />
  );
};

type WardsV2Props = {
  wards: Array<StoreWardV2>;
  debounce: string;
  onSelectProvince: (value: string, type: KeyOfProvince) => void;
};
const WardsComponentV2 = ({
  wards,
  debounce,
  onSelectProvince,
}: WardsV2Props) => {
  const newWards = useMemo(() => {
    return wards.filter(item =>
      removeVietnameseTones(item.ward_name).includes(
        removeVietnameseTones(debounce),
      ),
    );
  }, [debounce, wards]);
  return (
    <FlatList
      ListEmptyComponent={
        <TextNormalComponent size="sm" align="center">
          No matching results found!
        </TextNormalComponent>
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        spacing('padding').around,
        spacing('padding', 0, 80).bottom,
        flex.gap10,
      ]}
      data={newWards}
      renderItem={({item}) => (
        <Pressable onPress={() => onSelectProvince(item.ward_name, 'ward')}>
          <TextNormalComponent
            style={spacing('padding', 0, 5).vertical}
            size="sm">
            {item.ward_name}
          </TextNormalComponent>
        </Pressable>
      )}
      keyExtractor={item => item.ward_name}
    />
  );
};

const WardsComponent = WardsComponentV2;

export default memo(WardsComponent);
