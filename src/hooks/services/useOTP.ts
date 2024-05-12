import {setToast} from '@/store/actions';
import {useAppDispatch} from '@/store/index';
import {StoreAccount} from '@/types/entities';
import {otpService} from '@services';
import {handleErrorHooks} from '@utils';
import {PATTERN_EMAIL} from '@utils/constants';
import {useCallback, useState} from 'react';
import {ErrCallbackType, VerifyOTPParams} from '../types';

export function useOTP() {
  const dispatch = useAppDispatch();
  //   ** States
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingVerified, setLoadingVerified] = useState<boolean>(false);

  //   ** Handle verify OTP
  const handleVerifyOtp = useCallback(
    async (
      params: VerifyOTPParams,
      successCallback: () => void,
      errCallback: ErrCallbackType,
    ) => {
      try {
        setLoadingVerified(true);
        const verified = await otpService.verifyOtp(params);
        console.log(verified);
        successCallback();
      } catch (err) {
        // ** Handle errors
        handleErrorHooks(err, errCallback);
      } finally {
        setLoadingVerified(false);
      }
    },
    [],
  );

  //   ** Handle create email OTP
  const handleCreateEmail = useCallback(
    async (
      params: Pick<StoreAccount, 'email'>,
      successCallback: () => void,
      errCallback: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const response = await otpService.createEmail(params.email);
        if (response) {
          dispatch(
            setToast({
              toast: `Mã OTP của bạn là: ${response.code}`,
              variant: 'info',
            }),
          );
          console.log('useOTP --- create Email ==== 42 : ', response);
          successCallback();
        }
      } catch (err) {
        // ** Handle errors
        handleErrorHooks(err, errCallback);
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );

  // ** Handle create Phone OTP
  const handleCreatePhone = useCallback(
    async (
      params: Pick<StoreAccount, 'phone'>,
      successCallback: () => void,
      errCallback: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const response = await otpService.createPhone(params.phone);
        if (response) {
          dispatch(
            setToast({
              toast: `Mã OTP của bạn là: ${response.code}`,
              variant: 'info',
            }),
          );
          console.log('useOTP --- create Phone ==== 66 : ', response);
          successCallback();
        }
      } catch (err) {
        // ** Handle errors
        handleErrorHooks(err, errCallback);
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );

  // ** Handle send code
  const handleSendCode = useCallback(
    async (
      params: Pick<StoreAccount, 'username'>,
      successCallback: () => void,
      errCallback: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        let response: {code: string};
        if (PATTERN_EMAIL.test(params.username)) {
          response = await otpService.createEmail(params.username);
        } else {
          response = await otpService.createPhone(params.username);
        }
        if (response) {
          dispatch(
            setToast({
              toast: `Mã OTP của bạn là: ${response.code}`,
              variant: 'info',
            }),
          );
          console.log('useOTP === handle send code ==== 101 : ', response);
          successCallback();
        }
      } catch (error) {
        // ** Handle errors
        handleErrorHooks(error, errCallback);
      } finally {
        setLoading(false);
      }
    },

    [dispatch],
  );

  return {
    loading,
    loadingVerified,
    handleVerifyOtp,
    handleCreateEmail,
    handleCreatePhone,
    handleSendCode,
  };
}
