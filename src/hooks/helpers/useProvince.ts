import {useEffect, useState} from 'react';
import {StoreProvince, StoreProvinceV2} from '@/types/entities';
import axiosClient from 'lib/axios';

/**
 * @remarks This hook to fetch data provinces
 * @returns data of provinces
 * @property loading - True if hook is fetching data
 * @property provinces - List of data provinces
 */
export function useProvinceV1() {
  // ** States
  const [loading, setLoading] = useState(true);
  const [provinces, setProvinces] = useState<StoreProvince[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response: StoreProvince[] = await axiosClient.get(
          'https://provinces.open-api.vn/api/?depth=3',
        );
        setProvinces(
          response
            .map(item => ({
              ...item,
              name: item.name.replace('Tỉnh', '').trim(),
            }))
            .sort((a, b) => (a.name > b.name ? 1 : -1)),
        );
        setLoading(false);
        console.log('response: ', response);
      } catch (error) {
        console.log('error: ', error);
        setLoading(false);
      }
    })();
  }, []);

  return {loading, provinces};
}

export function useProvinceV2() {
  // ** States
  const [loading, setLoading] = useState(true);
  const [provinces, setProvinces] = useState<StoreProvinceV2[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response: {results: StoreProvinceV2[]} = await axiosClient.get(
          'https://vapi.vnappmob.com/api/province/',
        );

        setProvinces(
          response.results
            .map(item => ({
              ...item,
              province_name: item.province_name?.replace('Tỉnh', '').trim(),
            }))
            .sort((a, b) => (a.province_name > b.province_name ? 1 : -1)),
        );
        setLoading(false);
      } catch (error) {
        console.log('error: ', error);
        setLoading(false);
      }
    })();
  }, []);

  return {loading, provinces};
}
