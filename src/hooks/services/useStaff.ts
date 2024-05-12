import {selectUser} from '@/store/selectors';
import {accountService} from '@services/authorization';
import {ParamCreateStaff, ParamCreateSub} from '@services/types';
import {getTypeService, handleErrorHooks} from '@utils/utilities';
import {useCallback, useState} from 'react';
import {useSWRConfig} from 'swr';
import {useAppSelector} from '../../store';
import {ErrCallbackType} from '../types';

export function useStaff() {
  const {mutate} = useSWRConfig();
  const {user} = useAppSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const handleCreateSubAccount = useCallback(
    async (
      params: ParamCreateSub,
      successCallback: () => void,
      error: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const created = await accountService.createSub(
          {
            ...params,
            username: params.username?.toLowerCase(),
          },
          getTypeService(user),
        );
        if (created) {
          mutate('ListOfStaff');
          successCallback();
        }
      } catch (err) {
        handleErrorHooks(err, error);
      } finally {
        setLoading(false);
      }
    },
    [user, mutate],
  );
  const handleCreateStaffAccount = useCallback(
    async (
      params: ParamCreateStaff,
      successCallback: () => void,
      error: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        console.log('DATA STAFF: ', params);

        const created = await accountService.createStaff(
          {
            ...params,
            username: params.username?.toLowerCase(),
          },
          getTypeService(user),
        );
        console.log('created: ', created);

        if (created) {
          mutate('ListOfStaff');
          successCallback();
        }
      } catch (err) {
        console.log(err);

        handleErrorHooks(err, error);
      } finally {
        setLoading(false);
      }
    },
    [user, mutate],
  );
  return {
    loading,
    handleCreateSubAccount,
    handleCreateStaffAccount,
  };
}
