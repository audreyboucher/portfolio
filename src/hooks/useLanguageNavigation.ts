import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router'

type NavigateOptions = {
  replace?: boolean
}

export const useLanguageNavigation = () => {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const navigateTo = (path: string, options?: NavigateOptions) => {
    const fullPath = `/${i18n.language}${path.startsWith('/') ? path : `/${path}`}`
    navigate(fullPath, { replace: options?.replace ?? true })
  }

  const redirectToLanguagePath = () => {
    const currentPath = location.pathname
    const pathWithoutLanguage = currentPath.replace(/^\/[a-z]{2}(\/|$)/, '$1')
    
    if (pathWithoutLanguage === currentPath) {
      const fullPath = `/${i18n.language}${currentPath.startsWith('/') ? currentPath : `/${currentPath}`}`
      navigate(fullPath, { replace: true })
    }
  }

  return {
    navigateTo,
    redirectToLanguagePath,
  }
}