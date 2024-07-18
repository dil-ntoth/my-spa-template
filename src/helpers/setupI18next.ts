import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import locales, { FALLBACK_LNG } from '../locales';

export default function setupI18next() {
  i18n.use(initReactI18next).init({
    resources: locales,
    fallbackLng: FALLBACK_LNG,
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
}
