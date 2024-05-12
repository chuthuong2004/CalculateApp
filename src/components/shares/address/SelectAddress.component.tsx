import {View} from 'react-native';
import React, {memo, useCallback} from 'react';

// ** Share components
import {InputComponent, TextNormalComponent} from '@components/shares';

// ** Global Styles
import {flex, spacing} from '@styles';

// ** Constants
import {ICON} from '@utils/constants';

// ** Types
import {Nullable} from '@/types/commons';
import {KeyOfProvince} from '@/types/entities';

// ** Components
import {
  WardsComponent,
  DistrictComponent,
  ProvinceComponent,
  LoadingProvinceComponent,
  SelectedProvinceComponent,
} from './components';
import {useTheme} from '@react-navigation/native';

// ** Custom hook
import {defaultValues, useAddress} from '@hooks';

type SelectAddressComponent = {
  callbackEnd?: (province: Record<KeyOfProvince, string>) => void;
  callbackSelectDistrict?: (province: Record<KeyOfProvince, string>) => void;
  dataParamsProvince: Nullable<Record<KeyOfProvince, string>>;
};
const SelectAddressComponent = ({
  callbackEnd,
  callbackSelectDistrict,
  dataParamsProvince,
}: SelectAddressComponent) => {
  const {
    loading,
    handleSelectType,
    selectType,
    valueSelected,
    searchValue,
    handleSearch,
    handleSelectProvince,
    provinces,
    debounceValue,
    districts,
    wards,
  } = useAddress(dataParamsProvince);

  const onSelectProvince = useCallback(
    (value: string, type: KeyOfProvince) => {
      handleSelectProvince(value, type, callbackSelectDistrict, callbackEnd);
    },
    [callbackEnd, callbackSelectDistrict, handleSelectProvince],
  );

  const {colors} = useTheme();
  return (
    <View style={[flex.flex1, flex.widthFull]}>
      <SelectedProvinceComponent
        selectType={selectType}
        valueSelected={valueSelected}
        onSelectType={handleSelectType}
      />
      <View style={[flex.flex1, spacing('padding').around, flex.gap10]}>
        <TextNormalComponent>{defaultValues[selectType]}</TextNormalComponent>
        <View>
          <InputComponent
            rounded
            value={searchValue}
            onChangeText={handleSearch}
            placeholder="Search Province / City, District, Ward / Commune"
            iconLeft={{
              name: ICON.Feather.search,
              type: 'Feather',
              color: colors.text,
            }}
          />
        </View>
        <View style={[flex.gap20]}>
          {loading && <LoadingProvinceComponent />}
          {selectType === 'province' && (
            <ProvinceComponent
              provinces={provinces}
              debounce={debounceValue}
              onSelectProvince={onSelectProvince}
            />
          )}
          {selectType === 'district' && (
            <DistrictComponent
              districts={districts}
              debounce={debounceValue}
              onSelectProvince={onSelectProvince}
            />
          )}
          {selectType === 'ward' && (
            <WardsComponent
              wards={wards}
              debounce={debounceValue}
              onSelectProvince={onSelectProvince}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default memo(SelectAddressComponent);
