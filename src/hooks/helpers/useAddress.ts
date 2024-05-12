import {StoreAddress} from '@/types/commons';
import {
  KeyOfProvince,
  ParamAddress,
  StoreDistrict,
  StoreDistrictV2,
  StoreWard,
  StoreWardV2,
} from '@/types/entities';
import {ErrCallbackType} from '@hooks/types';
import {addressService} from '@services/medical';
import {ParamCreateAddress} from '@services/types';
import {handleErrorHooks} from '@utils/utilities';
import axiosClient from 'lib/axios';
import {useCallback, useEffect, useState} from 'react';
import {useSWRConfig} from 'swr';
import {useDebounce} from '../utils';
import {useProvinceV1, useProvinceV2} from './useProvince';

// ** Default Values
export const defaultValues: Record<KeyOfProvince, string> = {
  province: 'Select Province / City',
  district: 'Select District',
  ward: 'Select Ward / Commune',
};

/**
 *  This hook to handle address
 * @param {object} dataAddress Current address
 * @returns {object} Object contain value address
 *  @property {boolean} loading - True if data provinces is fetching
 *  @property {array} provinces - List data provinces
 *  @property {array} districts - List data districts
 *  @property {array} wards - List data wards
 *  @property {function} handleSelectProvince - This function handle select address
 *  @property {function} handleSelectType - This function handle select type
 *  @property {string} selectType - Value of "province" | "district" | "ward"
 *  @property {object} valueSelected - Address selected
 *  @property {function} handleSearch - This function to handle search address
 *  @property {string} searchValue - Search value
 *  @property {string} debounceValue - Value debounce of value search
 */
export function useAddressV1(dataAddress: ParamAddress) {
  // ** Province hooks
  const {loading, provinces} = useProvinceV1();
  console.log('provinces: ', provinces);

  const [districts, setDistricts] = useState<Array<StoreDistrict>>([]);

  const [wards, setWards] = useState<Array<StoreWard>>([]);
  // ** States
  const [selectType, setSelectType] = useState<KeyOfProvince>('province');

  const [valueSelected, setValueSelected] = useState<
    Record<KeyOfProvince, string>
  >(() =>
    dataAddress
      ? Object.values(dataAddress).every(item => item.length > 0)
        ? dataAddress
        : defaultValues
      : defaultValues,
  );

  const [searchValue, setSearchValue] = useState('');
  // ** Debounce value
  const debounceValue = useDebounce(searchValue, 500);

  // ** Effect
  useEffect(() => {
    if (dataAddress && provinces.length > 0) {
      const dataDistricts: StoreDistrict[] =
        provinces.find(item => item.name === dataAddress.province)?.districts ||
        [];
      const dataWards: StoreWard[] =
        dataDistricts.find(item => item.name === dataAddress.district)?.wards ||
        [];
      setDistricts(
        dataDistricts
          .map(item => ({
            ...item,
            name:
              item.name.split(' ').length > 2
                ? item.name.replace('Quận', '').trim()
                : item.name,
          }))
          .sort((a, b) => (a.name > b.name ? 1 : -1)),
      );
      setWards(dataWards.sort((a, b) => (a.name > b.name ? 1 : -1)));
    }
  }, [dataAddress, provinces]);

  // ** Handle select province
  const handleSelectProvince = useCallback(
    (
      value: string,
      type: KeyOfProvince,
      cbSelectDistrict?: (value: Record<KeyOfProvince, string>) => void,
      callbackEnd?: (value: Record<KeyOfProvince, string>) => void,
    ) => {
      setSearchValue('');
      if (type === 'province') {
        setValueSelected({...defaultValues, [type]: value});
        setSelectType('district');
        setDistricts(
          provinces
            .find(item => item.name === value)
            ?.districts.map(item => ({
              ...item,
              name:
                item.name.split(' ').length > 2
                  ? item.name.replace('Quận', '').trim()
                  : item.name,
            }))

            .sort((a, b) => (a.name > b.name ? 1 : -1)) || [],
        );
      }
      if (type === 'district') {
        setValueSelected(prev => ({
          province: prev?.province ? prev.province : '',
          ward: defaultValues.ward,
          [type]: value,
        }));
        if (cbSelectDistrict) {
          cbSelectDistrict({...valueSelected, [type]: value});
        }

        setSelectType('ward');
        const district = districts.find(item => item.name === value);
        if (district && district.wards.length > 0) {
          setWards(district.wards.sort((a, b) => (a.name > b.name ? 1 : -1)));
        } else {
          if (callbackEnd) {
            callbackEnd({
              ...valueSelected,
              [type]: value,
            });
          }
        }
      }
      if (type === 'ward') {
        setValueSelected(prev => ({
          ...prev,
          [type]: value,
        }));
        if (callbackEnd) {
          callbackEnd({
            ...valueSelected,
            [type]: value,
          });
        }
      }
    },
    [districts, provinces, valueSelected],
  );
  // ** Handle select type
  const handleSelectType = useCallback((type: KeyOfProvince) => {
    setSelectType(type);
  }, []);

  const handleSearch = useCallback((search: string) => {
    setSearchValue(search);
  }, []);
  return {
    loading,
    provinces,
    districts,
    wards,
    handleSelectProvince,
    handleSelectType,
    selectType,
    valueSelected,
    handleSearch,
    searchValue,
    debounceValue,
  };
}
export function useAddressV2(dataAddress: ParamAddress) {
  // ** Province hooks
  const {loading, provinces} = useProvinceV2();
  const [districts, setDistricts] = useState<Array<StoreDistrictV2>>([]);

  const [wards, setWards] = useState<Array<StoreWardV2>>([]);
  // ** States
  const [selectType, setSelectType] = useState<KeyOfProvince>('province');

  const [valueSelected, setValueSelected] = useState<
    Record<KeyOfProvince, string>
  >(() =>
    dataAddress
      ? Object.values(dataAddress).every(item => item.length > 0)
        ? dataAddress
        : defaultValues
      : defaultValues,
  );

  const [searchValue, setSearchValue] = useState('');
  // ** Debounce value
  const debounceValue = useDebounce(searchValue, 500);

  // ** Effect
  useEffect(() => {
    if (dataAddress && provinces.length > 0) {
      const fetchAddressDefault = async () => {
        if (dataAddress.province) {
          const province = provinces.find(
            item => item.province_name === dataAddress.province,
          );
          if (province) {
            const dataDistrict: {results: StoreDistrictV2[]} =
              await axiosClient.get(
                `https://vapi.vnappmob.com/api/province/district/${province.province_id}`,
              );
            setDistricts(
              dataDistrict.results
                .map(item => ({
                  ...item,
                  name:
                    item.district_name.split(' ').length > 2
                      ? item.district_name.replace('Quận', '').trim()
                      : item.district_name,
                }))
                .sort((a, b) => (a.name > b.name ? 1 : -1)),
            );
            if (dataAddress.district) {
              const district = dataDistrict.results.find(
                item => item.district_name === dataAddress.district,
              );
              if (province) {
                const dataWards: {results: StoreWardV2[]} =
                  await axiosClient.get(
                    `https://vapi.vnappmob.com/api/province/ward/${district?.district_id}`,
                  );
                setWards(
                  dataWards.results.sort((a, b) =>
                    a.ward_name > b.ward_name ? 1 : -1,
                  ),
                );
              }
            }
          }
        }
      };
      fetchAddressDefault();
    }
  }, [dataAddress, provinces]);

  // ** Handle select province
  const handleSelectProvince = useCallback(
    async (
      value: string,
      type: KeyOfProvince,
      cbSelectDistrict?: (value: Record<KeyOfProvince, string>) => void,
      callbackEnd?: (value: Record<KeyOfProvince, string>) => void,
    ) => {
      setSearchValue('');
      if (type === 'province') {
        const province_id = provinces.find(item =>
          item.province_name.includes(value),
        );
        const dataDistrict: {results: StoreDistrictV2[]} =
          await axiosClient.get(
            `https://vapi.vnappmob.com/api/province/district/${province_id?.province_id}`,
          );
        setValueSelected({...defaultValues, [type]: value});
        setSelectType('district');
        setDistricts(
          dataDistrict.results
            .map(item => ({
              ...item,
              name:
                item.district_name.split(' ').length > 2
                  ? item.district_name.replace('Quận', '').trim()
                  : item.district_name,
            }))

            .sort((a, b) => (a.name > b.name ? 1 : -1)) || [],
        );
      }
      if (type === 'district') {
        setValueSelected(prev => ({
          province: prev?.province ? prev.province : '',
          ward: defaultValues.ward,
          [type]: value,
        }));
        if (cbSelectDistrict) {
          cbSelectDistrict({...valueSelected, [type]: value});
        }

        setSelectType('ward');
        const district = districts.find(item => item.district_name === value);
        if (district) {
          const dataWards: {results: StoreWardV2[]} = await axiosClient.get(
            `https://vapi.vnappmob.com/api/province/ward/${district?.district_id}`,
          );
          setWards(
            dataWards.results.sort((a, b) =>
              a.ward_name > b.ward_name ? 1 : -1,
            ),
          );
        } else {
          if (callbackEnd) {
            callbackEnd({
              ...valueSelected,
              [type]: value,
            });
          }
        }
      }
      if (type === 'ward') {
        setValueSelected(prev => ({
          ...prev,
          [type]: value,
        }));
        if (callbackEnd) {
          callbackEnd({
            ...valueSelected,
            [type]: value,
          });
        }
      }
    },
    [districts, provinces, valueSelected],
  );
  // ** Handle select type
  const handleSelectType = useCallback((type: KeyOfProvince) => {
    setSelectType(type);
  }, []);

  const handleSearch = useCallback((search: string) => {
    setSearchValue(search);
  }, []);
  return {
    loading,
    provinces,
    districts,
    wards,
    handleSelectProvince,
    handleSelectType,
    selectType,
    valueSelected,
    handleSearch,
    searchValue,
    debounceValue,
  };
}

export const useAddress = useAddressV2;

export function useMutateAddress() {
  const {mutate} = useSWRConfig();
  const [loading, setLoading] = useState(false);

  const handleCreateAddress = useCallback(
    async (
      params: ParamCreateAddress,
      successCallback: () => void,
      errCallback: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const created = await addressService.create(params);
        console.log('Tạo mới địa chỉ thành công: ', created);

        if (created) {
          mutate('GetAllAddresses');
          successCallback();
        }
      } catch (error) {
        handleErrorHooks(error, errCallback);
      } finally {
        setLoading(false);
      }
    },
    [mutate],
  );
  const handleUpdateAddress = useCallback(
    async (
      id: StoreAddress['_id'],
      params: Partial<ParamCreateAddress>,
      successCallback: () => void,
      errCallback: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const updated = await addressService.update(id, params);
        console.log('Cập nhật địa chỉ thành công: ', updated);

        if (updated) {
          mutate('GetAllAddresses');
          successCallback();
        }
      } catch (error) {
        handleErrorHooks(error, errCallback);
      } finally {
        setLoading(false);
      }
    },
    [mutate],
  );
  const handleDeleteAddress = useCallback(
    async (
      id: StoreAddress['_id'],
      successCallback: () => void,
      errCallback: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        await addressService.delete(id);

        mutate('GetAllAddresses');
        successCallback();
      } catch (error) {
        handleErrorHooks(error, errCallback);
      } finally {
        setLoading(false);
      }
    },
    [mutate],
  );
  return {
    loading,
    onCreateAddress: handleCreateAddress,
    onUpdateAddress: handleUpdateAddress,
    onDeleteAddress: handleDeleteAddress,
  };
}
