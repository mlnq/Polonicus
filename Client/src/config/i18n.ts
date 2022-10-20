import i18next from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

const language = localStorage.getItem('language')
export const DEFAULT_LANGUAGE = language || 'en'
export const DEFAULT_NAMESPACE = 'common'

const i18n = {
  init: () =>
    i18next
      .use(Backend)
      .use(initReactI18next)
      .init({
        lng: DEFAULT_LANGUAGE,
        fallbackLng: 'en',
        defaultNS: DEFAULT_NAMESPACE,
        interpolation: {
          escapeValue: false,
        },
        backend: {
          loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
      }),
}

export default i18n