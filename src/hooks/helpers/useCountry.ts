import axiosClient from 'lib/axios';
import useSWR from 'swr';
import {ResponseCountry} from '@/types/commons';
import {useMemo} from 'react';
import {StoreCountry} from '@/types/entities';

/**
 * @remarks This hook to fetch data country
 * @returns data of country
 * @see {@link https://swr.vercel.app/docs/api | response SWR hook}
 */
export function useCountry(search?: string) {
  // ** Fetch data repository
  const responseData = useSWR<ResponseCountry>('GET_ALL_COUNTRY', () =>
    axiosClient.get(
      'https://countriesnow.space/api/v0.1/countries/flag/unicode',
    ),
  );

  const dataRender = useMemo<Array<StoreCountry>>(() => {
    if (
      responseData?.data?.data &&
      responseData.data.data.length > 0 &&
      search
    ) {
      return responseData.data.data
        ? responseData.data.data.filter(
            c =>
              c.name.toLowerCase().includes(search.toLowerCase()) ||
              c.iso2 === search.toUpperCase(),
          )
        : [];
    }
    return responseData.data?.data || [];
  }, [responseData?.data, search]);

  return {
    ...responseData,
    results: dataRender,
  };
}
