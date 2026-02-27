import i18next from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

export enum Languages {
  EN = 'en',
  FR = 'fr',
}

export const defaultLanguage = Languages.EN
export const supportedLanguages = Object.values(Languages)

let initialized = false

const initializeI18next = () => {
  if (initialized) return
  initialized = true
  
  i18next
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: defaultLanguage,
      supportedLngs: supportedLanguages,
      backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
      ns: ['default'],
      defaultNS: 'default',
      debug: import.meta.env.DEV,
      interpolation: { escapeValue: false },
    })
}

if (typeof window !== 'undefined' && !import.meta.env.VITEST) {
  initializeI18next()
}

export default i18next