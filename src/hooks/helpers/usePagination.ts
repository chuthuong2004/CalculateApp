import {ResponsePagination} from '@/types/commons';
import {QueryOptions} from '@services/types';
import {useCallback, useEffect, useState} from 'react';
import useSWR from 'swr';

interface PaginationResult<T> {
  data: ResponsePagination<T> | undefined;
  isLoading: boolean;
  isValidating: boolean;
  isError: boolean;
  isLoadMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  onEndReached: (info: {distanceFromEnd: number}) => void;
}
type Fetcher<T> = (query: QueryOptions) => Promise<ResponsePagination<T>>;

/**
 *
 * @param key The key of the fetcher SWR
 * @param query The object of QueryOptions (page, limit, offset,...)
 * @param fetcher The callback to fetch data from API
 * @param inverted If true, data return will be reverted
 * @returns {Object} The list data with pagination
 *  @property {boolean} isLoading: true if the api is fetching
 *  @property {boolean} isValidating: true if the api is validating
 *  @property {Object} data: The list data with pagination
 *  @property {boolean} isError: true if the api is error
 *  @property {boolean} isLoadMore: true if the api is load more
 *  @property {function} loadMore: This callback will be load more data
 *  @property {function} refresh: This callback will be refresh data
 */
export function usePagination<T>(
  key: string,
  query: QueryOptions,
  fetcher: Fetcher<T>,
  inverted?: boolean,
  // swrConfig?: SWRConfiguration<SWRResponse<ResponsePagination<T>>>,
): PaginationResult<T> {
  const [isLoadMore, setIsLoadMore] = useState(false);
  const callback = useCallback(
    () => {
      return fetcher(query);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query.search, key],
  );

  const {data, error, isValidating, isLoading, mutate} = useSWR(key, callback, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  useEffect(() => {
    mutate();
  }, [query.search, mutate]);

  /**
   * @remarks
   * This callback will be load more data
   * @see {@link http://example.com/@internal | the @internal tag}
   */
  const loadMore = useCallback(async () => {
    console.log('loadmore');

    if (data && data?.docs.length < data?.totalDocs && !isLoadMore) {
      setIsLoadMore(true);
      const updateData = await fetcher({
        ...query,
        offset: data?.docs.length || 0,
      });
      mutate(
        (prevData: ResponsePagination<T> | undefined) => {
          if (!prevData) {
            return undefined;
          }
          return {
            ...updateData,
            docs: inverted
              ? [...updateData.docs, ...prevData.docs]
              : [...prevData.docs, ...updateData.docs],
          };
        },
        {revalidate: false},
      );
      setIsLoadMore(false);
    }
  }, [data, query, mutate, fetcher, inverted, isLoadMore]);

  /**
   * This callback wile be refresh data
   */
  const refresh = useCallback(async () => {
    const updateData = await fetcher({
      ...query,
      offset: 0,
    });
    mutate(updateData, {revalidate: false});
  }, [fetcher, mutate, query]);
  const onEndReached = useCallback(
    (info: {distanceFromEnd: number}) => {
      if (info.distanceFromEnd === 0 && data && data.docs.length > 0) {
        loadMore();
      }
    },
    [data, loadMore],
  );
  return {
    data,
    isLoading: isLoading,
    isError: !!error,
    loadMore,
    isLoadMore,
    refresh,
    isValidating,
    onEndReached,
  };
}
