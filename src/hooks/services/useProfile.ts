import {updateInfoBusiness, updateProfile} from '@/store/actions';
import {useAppSelector} from '@/store/index';
import {selectUser} from '@/store/selectors';
import {accountService, providerService} from '@services';
import {ParamUpdateInfoProvider, ParamUpdateProfile} from '@services/types';
import {handleErrorHooks} from '@utils';
import {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {ChangePasswordParams, ErrCallbackType} from '../types';

export function useProfile() {
  //   ** States Loading
  const {user} = useAppSelector(selectUser);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleUpdateProfile = useCallback(
    async (
      params: ParamUpdateProfile,
      successCallback: () => void,
      errorCallback?: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const res = await accountService.updateProfile(params);
        if (res) {
          console.log('UPDATE PROFILE: ', res);

          dispatch(updateProfile(res.account_id));
          successCallback();
        }
      } catch (err) {
        // ** Handle errors
        handleErrorHooks(err, errorCallback);
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );
  const handleUpdateBusiness = useCallback(
    async (
      params: ParamUpdateInfoProvider,
      successCallback: () => void,
      errorCallback?: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const res = await providerService.updateInfo(params);
        if (res) {
          console.log('UPDATE PROFILE: ', res);
          dispatch(updateInfoBusiness(res));
          successCallback();
        }
      } catch (err) {
        // ** Handle errors
        handleErrorHooks(err, errorCallback);
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );

  const handleChangePassword = useCallback(
    async (
      params: ChangePasswordParams,
      successCallback: () => void,
      errorCallback?: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const response = await accountService.changePassword(
          {
            old_password: params.currentPassword,
            new_password: params.newPassword,
          },
          user?.account_id.type_service || 'PROVIDER_MANAGER',
        );

        setLoading(false);
        console.log('CHANGE PASSWORD --- USE AUTH : 146 : ', response);
        successCallback();
      } catch (err) {
        // ** Handle errors
        handleErrorHooks(err, errorCallback);
        setLoading(false);
        console.log('errro', err);
      }
    },
    [user?.account_id.type_service],
  );
  return {
    loading,
    handleUpdateProfile,
    handleUpdateBusiness,
    handleChangePassword,
  };
}
