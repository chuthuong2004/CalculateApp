import {STORAGE_KEY} from '@utils/constants';
import {getString} from '@utils/storage';
import {changeLanguage} from 'i18next';
import {useEffect} from 'react';

export function useAppLanguage() {
  useEffect(() => {
    (async () => {
      const language = (await getString(STORAGE_KEY.language)) as string;
      language && changeLanguage(language);
    })();
  }, []);
}
