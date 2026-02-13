import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'
import type { ReactElement } from 'react'

export const mockMedia = (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(mockMedia),
})

Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
  configurable: true,
  get() {
    return this.textContent?.length! * window.innerWidth || 0
  },
})

type TransProps = {
  i18nKey: string;
  components: {
    [key: string]: ReactElement
  }
}

vi.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        on: vi.fn(),
        off: vi.fn(),
        changeLanguage: () => new Promise(() => {}),
      },
    }
  },
  initReactI18next: {
    type: '3rdParty',
    init: vi.fn(),
  },
  I18nextProvider: ({ children }: { children: ReactElement }) => children,
  Trans: ({ i18nKey, components }: TransProps) => (
    <>
      {i18nKey}
      {Object.values(components).map((component) => component)}
    </>
  ),
}))
