import type { FC, ReactElement, PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import type { i18n as I18n } from 'i18next'

import i18n, { defaultLanguage } from '@/i18next'

export const renderWithProviders = (
  ui: ReactElement,
  options: Partial<I18n> = {},
) => {
  const Wrapper: FC<PropsWithChildren> = ({ children }) => (
    <I18nextProvider i18n={{...i18n, language: defaultLanguage, ...options} as I18n}>
      {children}
    </I18nextProvider>
  )

  return render(ui, { wrapper: Wrapper })
}