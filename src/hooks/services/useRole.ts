import {useCallback, useState} from 'react';
import {StoreRole} from '@/types/entities';
import {ErrCallbackType} from '../types';
import {handleErrorHooks} from '@utils';
import {roleService} from '@services/roles';
import {ParamCreateRole} from '@services/types';
import {useSWRConfig} from 'swr';

export function useRole() {
  const {mutate} = useSWRConfig();
  const [loading, setLoading] = useState(false);

  //   ** Handle create category
  const handleCreateRole = useCallback(
    async (
      params: ParamCreateRole,
      successCallback: () => void,
      errorCallback: ErrCallbackType,
    ) => {
      setLoading(true);
      try {
        const created = await roleService.create(params);
        if (created) {
          mutate(
            key =>
              typeof key === 'string' &&
              key.startsWith('GetRolesFilterLowerBound'),
          );
          successCallback();
        }
      } catch (error) {
        // ** Handle errors
        handleErrorHooks(error, errorCallback);
      } finally {
        setLoading(false);
      }
    },
    [mutate],
  );
  //   ** Handle update category
  const handleUpdateRole = useCallback(
    async (
      id: StoreRole['_id'],
      params: ParamCreateRole,
      successCallback: () => void,
      errorCallback: ErrCallbackType,
    ) => {
      setLoading(true);
      try {
        const updated = await roleService.update(id, params);
        if (updated) {
          mutate(
            key =>
              typeof key === 'string' &&
              key.startsWith('GetRolesFilterLowerBound'),
          );
          successCallback();
        }
      } catch (error) {
        // ** Handle errors
        handleErrorHooks(error, errorCallback);
      } finally {
        setLoading(false);
      }
    },
    [mutate],
  );
  //   ** Handle delete category
  const handleDeleteRole = useCallback(
    async (
      id: StoreRole['_id'],
      successCallback: () => void,
      errorCallback: ErrCallbackType,
    ) => {
      setLoading(true);
      try {
        await roleService.delete(id);
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
  const handleUpgradeRole = useCallback(
    async (
      id: StoreRole['_id'],
      successCallback: () => void,
      errorCallback: ErrCallbackType,
    ) => {
      setLoading(true);
      try {
        await roleService.upgradeRole();
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
    handleCreateRole,
    handleUpdateRole,
    handleDeleteRole,
  };
}
