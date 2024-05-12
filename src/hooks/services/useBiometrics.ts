import {STORAGE_KEY} from '@utils/constants';
import {get} from '@utils/storage';
import {SetStateAction, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import * as Keychain from 'react-native-keychain';
type FormLogin = {
  username: string;
  password: string;
};
export default function useBiometrics() {
  const {t} = useTranslation();
  const loginWithBiometrics = useCallback(
    async (
      callbackLogin: (data: FormLogin) => void,
      setErrorBiometrics: (value: SetStateAction<string>) => void,
    ) => {
      const rnBiometrics = new ReactNativeBiometrics();
      const {biometryType, available} = await rnBiometrics.isSensorAvailable();
      if (
        available &&
        (biometryType === BiometryTypes.TouchID ||
          biometryType === BiometryTypes.FaceID ||
          biometryType === BiometryTypes.Biometrics)
      ) {
        console.log('Biometrics is supported');
        const isLoginWithBiometrics = await get<boolean>(
          STORAGE_KEY.loginWithBiometrics,
        );
        const message =
          'Vui lòng đăng nhập bằng mật khẩu để kích hoạt vân tay !';
        if (isLoginWithBiometrics) {
          const result = await rnBiometrics.simplePrompt({
            promptMessage: t('Touch fingerprint to open "Medical"'),
            cancelButtonText: t('Cancel') || '',
            fallbackPromptMessage:
              t('Use Fingerprint to unlock SGOD Medical' || '') || '',
          });
          if (result.success) {
            const credentials: false | Keychain.UserCredentials =
              await Keychain.getGenericPassword();
            if (credentials) {
              const dataRaw = JSON.parse(credentials.password) as FormLogin;
              callbackLogin(dataRaw);
            } else {
              setErrorBiometrics(message);
            }
            console.log('successful biometrics provided');
          } else {
            console.log('user cancelled biometric prompt');
          }
        } else {
          setErrorBiometrics(message);
        }
      } else {
        console.log('Biometrics not supported');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return {
    onLoginWithBiometrics: loginWithBiometrics,
  };
}
