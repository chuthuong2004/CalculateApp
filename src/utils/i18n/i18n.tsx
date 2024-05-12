import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import homeVi from 'locales/vi.json';
import homeEn from 'locales/en.json';

const resources = {
  en: {translation: homeEn},
  vi: {translation: homeVi},
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'vi',
  debug: false,
  fallbackLng: 'en',
  saveMissing: true,
});

export default i18next;
