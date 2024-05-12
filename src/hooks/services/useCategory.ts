import {useCallback, useState} from 'react';
import {StoreCategory, StoreMutableCategory} from '@/types/entities';
import {ErrCallbackType} from '../types';
import {categoryService} from '@services/medical';
import {handleErrorHooks} from '@utils';
import {useSWRConfig} from 'swr';

export function useCategory() {
  const {mutate} = useSWRConfig();
  const [loading, setLoading] = useState(false);

  //   ** Handle create category
  const handleCreateCategory = useCallback(
    async (
      params: Partial<StoreMutableCategory>,
      successCallback: () => void,
      errorCallback: ErrCallbackType,
    ) => {
      setLoading(true);
      try {
        const created = await categoryService.create(params);
        if (created) {
          setLoading(false);
          successCallback();
          // mutate(
          //   'CategoryManagement',
          //   prevData => ({
          //     ...prevData,
          //     docs: [created, ...prevData],
          //   }),
          //   {revalidate: false},
          // );
        }
      } catch (error) {
        // ** Handle errors
        handleErrorHooks(error, errorCallback);
        setLoading(false);
      }
    },
    [],
  );
  //   ** Handle update category
  const handleUpdateCategory = useCallback(
    async (
      id: StoreCategory['_id'],
      params: Partial<StoreMutableCategory>,
      successCallback: () => void,
      errorCallback: ErrCallbackType,
    ) => {
      setLoading(true);
      try {
        console.log('params: ', params);

        const updated = await categoryService.update(id, params);
        console.log(updated);

        if (updated) {
          setLoading(false);
          successCallback();
          mutate(key => typeof key === 'string' && key.startsWith('Category'));
        }
      } catch (error) {
        // ** Handle errors
        handleErrorHooks(error, errorCallback);
        setLoading(false);
      }
    },
    [mutate],
  );
  //   ** Handle delete category
  const handleDeleteCategory = useCallback(
    async (
      id: StoreCategory['_id'],
      successCallback: () => void,
      errorCallback: ErrCallbackType,
    ) => {
      setLoading(true);
      try {
        await categoryService.delete(id);
        setLoading(false);
        successCallback();
        mutate(key => typeof key === 'string' && key.startsWith('Category'));
      } catch (error) {
        // ** Handle errors
        handleErrorHooks(error, errorCallback);
        setLoading(false);
      }
    },
    [mutate],
  );
  //   ** Handle delete many category
  const handleDeleteManyCategory = useCallback(
    async (
      categories: Array<StoreCategory['_id']>,
      successCallback: () => void,
      errorCallback: ErrCallbackType,
    ) => {
      setLoading(true);
      try {
        await categoryService.deleteMany(categories);
        setLoading(false);
        successCallback();
      } catch (error) {
        // ** Handle errors
        handleErrorHooks(error, errorCallback);
        setLoading(false);
      }
    },
    [],
  );

  return {
    loading,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    handleDeleteManyCategory,
  };
}
