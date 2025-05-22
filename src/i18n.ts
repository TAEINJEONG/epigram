import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import nextI18NextConfig from '../next-i18next.config.js';

i18n.use(initReactI18next).init({
  ...nextI18NextConfig.i18n,
  ns: ['common'],
  defaultNS: 'common',
  fallbackLng: nextI18NextConfig.i18n.defaultLocale,
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export default i18n;
