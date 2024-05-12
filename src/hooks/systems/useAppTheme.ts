import {setIsFirst, setTheme} from '@/store/actions';
import {useAppDispatch} from '@/store/index';
import {ThemeModeType} from '@/types/commons';
import {STORAGE_KEY} from '@utils/constants';
import {get, save} from '@utils/storage';
import {useCallback, useEffect} from 'react';
import {useColorScheme} from 'react-native';
import * as Keychain from 'react-native-keychain';

/**
 * This hook will set theme mode app
 */
export function useAppTheme() {
  const appearance = useColorScheme();
  const dispatch = useAppDispatch();
  const setAppTheme = useCallback(async () => {
    const IS_FIRST = await get<boolean>(STORAGE_KEY.isFirst);
    if (IS_FIRST === null) {
      console.log('appearance: ', appearance);

      await Keychain.resetGenericPassword();
      dispatch(setTheme(appearance === 'light' ? 'light' : 'dark'));
      dispatch(setIsFirst(null));
      save<string>(STORAGE_KEY.theme, appearance || 'dark');
    } else {
      dispatch(setIsFirst(true));

      const themeValue = await get<string>(STORAGE_KEY.theme);
      if (themeValue) {
        dispatch(setTheme(themeValue as ThemeModeType));
      }
    }
  }, [appearance, dispatch]);

  useEffect(() => {
    setAppTheme();
  }, [setAppTheme]);
}
