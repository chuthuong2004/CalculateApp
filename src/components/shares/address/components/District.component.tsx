import {Pressable, FlatList} from 'react-native';
import React, {memo, useMemo} from 'react';

// ** Share components
import {TextNormalComponent} from '@components/shares';

// ** Global styles
import {spacing, flex} from '@styles';

// ** Types
import {KeyOfProvince, StoreDistrict, StoreDistrictV2} from '@/types/entities';

// ** Utilities
import {removeVietnameseTones} from '@utils';

type DistrictV1Props = {
  districts: Array<StoreDistrict>;
  debounce: string;
  onSelectProvince: (value: string, type: KeyOfProvince) => void;
};
export const DistrictComponentV1 = ({
  debounce,
  districts,
  onSelectProvince,
}: DistrictV1Props) => {
  const newDistricts = useMemo(() => {
    return districts.filter(item =>
      removeVietnameseTones(item.name).includes(
        removeVietnameseTones(debounce),
      ),
    );
  }, [districts, debounce]);
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
      data={newDistricts}
      renderItem={({item}) => (
        <Pressable onPress={() => onSelectProvince(item.name, 'district')}>
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

type DistrictV2Props = {
  districts: Array<StoreDistrictV2>;
  debounce: string;
  onSelectProvince: (value: string, type: KeyOfProvince) => void;
};
const DistrictComponentV2 = ({
  debounce,
  districts,
  onSelectProvince,
}: DistrictV2Props) => {
  const newDistricts = useMemo(() => {
    return districts.filter(item =>
      removeVietnameseTones(item.district_name).includes(
        removeVietnameseTones(debounce),
      ),
    );
  }, [districts, debounce]);
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
      data={newDistricts}
      renderItem={({item}) => (
        <Pressable
          onPress={() => onSelectProvince(item.district_name, 'district')}>
          <TextNormalComponent
            style={spacing('padding', 0, 5).vertical}
            size="sm">
            {item.district_name}
          </TextNormalComponent>
        </Pressable>
      )}
      keyExtractor={item => item.district_id}
    />
  );
};

const DistrictComponent = DistrictComponentV2;

export default memo(DistrictComponent);
