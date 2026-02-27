import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'
import { createElement } from 'react'

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

class IntersectionObserver {
  observe = vi.fn()
  disconnect = vi.fn()
  unobserve = vi.fn()
}

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
})

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router')
  return {
    ...actual,
    BrowserRouter: ({ children }: any) => {
      const { MemoryRouter } = actual as any
      const initialEntries = [globalThis.window?.location?.pathname || '/']
      return createElement(MemoryRouter, { initialEntries }, children)
    },
  }
})

vi.mock('i18next', () => {
  const mockI18n = {
    use(plugin: any) { return this },
    init(options: any) { return mockI18n },
    language: 'en',
    changeLanguage: () => Promise.resolve(),
    on: vi.fn(),
    off: vi.fn(),
  }
  return { default: mockI18n }
})

vi.mock('i18next-http-backend', () => ({ default: { type: 'backend', init: vi.fn() } }))
vi.mock('i18next-browser-languagedetector', () => ({ default: { type: 'detector', init: vi.fn() } }))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      on: vi.fn(),
      off: vi.fn(),
      changeLanguage: () => Promise.resolve(),
      language: 'en',
      exists: () => true,
    },
  }),
  initReactI18next: { type: '3rdParty', init: vi.fn() },
  I18nextProvider: ({ children }: any) => children,
  Trans: ({ children, i18nKey }: any) => children || i18nKey,
}))