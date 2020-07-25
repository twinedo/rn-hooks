import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (cb) => cb('id'),
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translations: {
          welcome: 'Welcome',
          'how are you': 'How are you?',
          amazing: 'Amazing',
        },
      },
      id: {
        translations: {
          welcome: 'Selamat Datang',
          'how are you': 'Apa kabar mu?',
          amazing: 'Luar Biasa',
        },
      },
    },
    fallbackLng: 'en',
    debug: true,
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
