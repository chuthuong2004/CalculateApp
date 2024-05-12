import {FlatList, Pressable} from 'react-native';
import React, {memo, useMemo} from 'react';

// ** Types
import {KeyOfProvince, StoreProvince, StoreProvinceV2} from '@/types/entities';

// ** Share components
import {TextNormalComponent} from '@components/shares';

// ** Global Styles
import {spacing, flex} from '@styles';

// ** Utilities
import {removeVietnameseTones} from '@utils';

type ProvinceV1Props = {
  provinces: Array<StoreProvince>;
  debounce: string;
  onSelectProvince: (value: string, type: KeyOfProvince) => void;
};
export const ProvinceComponentV1 = ({
  provinces,
  debounce,
  onSelectProvince,
}: ProvinceV1Props) => {
  const newProvinces = useMemo(() => {
    return provinces.filter(item =>
      removeVietnameseTones(item.name).includes(
        removeVietnameseTones(debounce),
      ),
    );
  }, [debounce, provinces]);
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
      data={newProvinces}
      renderItem={({item}) => (
        <Pressable onPress={() => onSelectProvince(item.name, 'province')}>
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

type ProvinceV2Props = {
  provinces: Array<StoreProvinceV2>;
  debounce: string;
  onSelectProvince: (value: string, type: KeyOfProvince) => void;
};
const ProvinceComponentV2 = ({
  provinces,
  debounce,
  onSelectProvince,
}: ProvinceV2Props) => {
  const newProvinces = useMemo(() => {
    return provinces.filter(item =>
      removeVietnameseTones(item.province_name).includes(
        removeVietnameseTones(debounce),
      ),
    );
  }, [debounce, provinces]);
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
      data={newProvinces}
      renderItem={({item}) => (
        <Pressable
          onPress={() => onSelectProvince(item.province_name, 'province')}>
          <TextNormalComponent
            style={spacing('padding', 0, 5).vertical}
            size="sm">
            {item.province_name}
          </TextNormalComponent>
        </Pressable>
      )}
      keyExtractor={item => item.province_id}
    />
  );
};

const ProvinceComponent = ProvinceComponentV2;
export default memo(ProvinceComponent);
