import {repositoryService} from '@services';
import {useSWRConfig} from 'swr';
import {ErrCallbackType} from '../types';
import {handleErrorHooks} from '@utils';
import {useCallback, useState} from 'react';
import {ParamMutateRepository} from '@services/types';

export function useRepository() {
  const {mutate} = useSWRConfig();
  const [loading, setLoading] = useState(false);
  //   ** Handle create repository
  const handleCreateRepository = useCallback(
    async (
      params: ParamMutateRepository,
      successCallback: () => void,
      errorCallback: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const created = await repositoryService.create(params);
        if (created) {
          successCallback();
          mutate(
            key => typeof key === 'string' && key.startsWith('Repository'),
          );
        }
        console.log('created: ', created);
      } catch (error) {
        console.log('Error: ', error);

        handleErrorHooks(error, errorCallback);
      } finally {
        setLoading(false);
      }
    },
    [mutate],
  );

  //   ** Handle delete repository
  const handleDeleteRepository = useCallback(
    async (
      id: string,
      successCallback: () => void,
      errorCallback: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        await repositoryService.delete(id);
        mutate(key => typeof key === 'string' && key.startsWith('Repository'));
        successCallback();
      } catch (error) {
        handleErrorHooks(error, errorCallback);
      } finally {
        setLoading(false);
      }
    },
    [mutate],
  );

  //   ** Handle edit repository
  const handleEditRepository = useCallback(
    async (
      id: string,
      params: ParamMutateRepository,
      successCallback: () => void,
      errorCallback: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const updated = await repositoryService.update(id, params);
        if (updated) {
          mutate(key => typeof key === 'string' && key.startsWith('Reposi'));
          successCallback();
        }
      } catch (error) {
        handleErrorHooks(error, errorCallback);
      } finally {
        setLoading(false);
      }
    },
    [mutate],
  );

  return {
    loading,
    handleCreateRepository,
    handleDeleteRepository,
    handleEditRepository,
  };
}
