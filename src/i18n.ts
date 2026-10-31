import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import * as en from './locales/en'
import * as fr from './locales/fr'
import * as pt from './locales/pt'

i18n.use(initReactI18next).init({
  resources: { en, fr, pt },
  ns: ['common', 'home', 'journey', 'projects'],
  defaultNS: 'common',
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
