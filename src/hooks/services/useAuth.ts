import {useCallback, useState} from 'react';

// ** Keychain
import * as Keychain from 'react-native-keychain';

// ** Utilities
import {handleErrorHooks} from '@utils';

// ** Types
import {StoreToken} from '@/types/commons';
import {
  ErrCallbackType,
  ForgotPasswordParams,
  LoginParams,
  RegisterParams,
} from '../types';

// ** Services
import {accountService, authService} from '@services/authorization';

// ** Redux
import {useAppDispatch, useAppSelector} from '@/store';

// ** Selectors
import {selectUser} from '@/store/selectors';

// ** Actions
import {
  logout,
  setCredentials,
  setLoadingApp,
  setRememberAccount,
  setToast,
} from '@/store/actions';

export function useAuth() {
  // ** Selectors
  const {user} = useAppSelector(selectUser);

  // ** Dispatch
  const dispatch = useAppDispatch();

  //   ** States
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (
    params: LoginParams,
    changePasswordCallback: () => void,
    errorCallback?: ErrCallbackType,
  ) => {
    try {
      // ** Handle logic login here
      setLoading(true);
      const response = await authService.login({
        password: params.password,
        username: params.username.toLowerCase(),
      });
      console.log('response: ', response);
      const {access_token, refresh_token, ...dataUser} = response;
      const token: StoreToken = {
        access_token,
        refresh_token,
      };
      //   ** Stored token
      await Keychain.setGenericPassword(
        JSON.stringify(token),
        JSON.stringify({
          username: params.username,
          password: params.password,
        }),
      );
      // if (dataUser.account_id.status === 'pending') {
      // changePasswordCallback();
      // } else {
      //   ** Stored users
      dispatch(
        setCredentials({
          ...dataUser,
          refresh_token,
        }),
      );
      setTimeout(() => {
        dispatch(
          setToast({
            toast: `Xin chào ${dataUser?.account_id?.full_name?.first} ${dataUser?.account_id?.full_name?.last}`,
            variant: 'dark',
          }),
        );
      }, 1000);
      if (params.rememberMe) {
        // ** store username & password
        dispatch(
          setRememberAccount({
            username: params.username,
            password: params.password,
          }),
        );
      }
      // }
      setLoading(false);
    } catch (err) {
      // ** Handle errors
      handleErrorHooks(err, errorCallback);
      setLoading(false);
      // dispatch(setCredentials(USER_DUMMY));
    }
  };

  // ** Handle logout
  const handleLogout = useCallback(async () => {
    const credential = await Keychain.getGenericPassword();
    try {
      dispatch(logout());
      await authService.logout();
      await Keychain.setGenericPassword(
        JSON.stringify(''),
        credential ? credential.password : JSON.stringify(''),
      );
    } catch (error) {
      await Keychain.setGenericPassword(
        JSON.stringify(''),
        credential ? credential.password : JSON.stringify(''),
      );
    }
  }, [dispatch]);

  // ** Handle register
  const handleRegister = useCallback(
    async (
      params: RegisterParams,
      successCallback: () => void,
      errorCallback?: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const registered = await accountService.createRoot(params);
        console.log('register: ', registered);
        if (registered) {
          successCallback();
        }
        setLoading(false);
      } catch (err) {
        // ** Handle errors
        handleErrorHooks(err, errorCallback);
        setLoading(false);
      }
    },
    [],
  );

  // ** Handle forgot password
  const handleForgotPassword = useCallback(
    async (
      params: ForgotPasswordParams,
      successCallback: () => void,
      errorCallback?: ErrCallbackType,
    ) => {
      try {
        setLoading(true);
        const reset = await authService.resetPassword(params.username, {
          new_password: params.password,
        });
        setLoading(false);
        successCallback();
        console.log('forgot password: ', reset);
      } catch (err) {
        // ** Handle errors
        handleErrorHooks(err, errorCallback);
        setLoading(false);
      }
    },
    [],
  );

  // ** initial auth
  const initAuth = useCallback(async (): Promise<void> => {
    try {
      // Retreive the credentials
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        const token = JSON.parse(credentials.username) as StoreToken;

        if (token && token.access_token) {
          try {
            const profile = await accountService.getProfile();
            console.log('profile: ', profile);
            dispatch(setCredentials(profile));
            setTimeout(() => {
              dispatch(
                setToast({
                  toast: `Xin chào ${profile?.account_id?.full_name?.first} ${profile?.account_id?.full_name?.last}`,
                  variant: 'dark',
                }),
              );
            }, 4000);
          } catch (error) {
            console.log('error profile: ', error);
            // dispatch(setCredentials(USER_DUMMY));
          }
        } else {
        }
      } else {
        console.log('No credentials stored');
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
    setTimeout(() => {
      dispatch(setLoadingApp(false));
    }, 2000);
  }, [dispatch]);

  return {
    user,
    loading,
    handleLogin,
    handleLogout,
    handleRegister,
    handleForgotPassword,
    initAuth,
  };
}
