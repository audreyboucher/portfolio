import { useCallback, useEffect, useRef, type FC } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

import { Home, NotFound } from '@/pages'
import { defaultLanguage, supportedLanguages, type Languages } from '@/i18next'
import useLanguageNavigation from '@/hooks/useLanguageNavigation'

const RouteHandler: FC = () => {
  const { lang } = useParams<{ lang: Languages }>()
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const langRef = useRef(lang)
  const { redirectToLanguagePath } = useLanguageNavigation()

  useEffect(() => {
    langRef.current = lang
  }, [lang])

  useEffect(() => {
    if (!lang || !supportedLanguages.includes(lang)) {
      redirectToLanguagePath()
      return
    }

    if (i18n.language !== lang) {
      i18n.changeLanguage(lang)
      window.document.documentElement.lang = lang
    }
  }, [lang, navigate])

  const handleLanguageChange = useCallback((lng: string) => {
    window.document.documentElement.lang = lng
    if (lng !== langRef.current) navigate(`/${lng}`, { replace: true })
  }, [navigate])

  useEffect(() => {
    i18n.on('languageChanged', handleLanguageChange)
    return () => { i18n.off('languageChanged', handleLanguageChange) }
  }, [handleLanguageChange])

  return (
    <Routes>
      <Route path="" Component={Home} />
      <Route path="404" Component={NotFound} />
      <Route path="*" element={<Navigate to={`/${lang}/404`} replace />} />
    </Routes>
  )
}

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path=":lang/*" Component={RouteHandler} />
      <Route path="*" element={<Navigate to={`/${defaultLanguage}`} replace />} />
    </Routes>
  </BrowserRouter>
)

export default App