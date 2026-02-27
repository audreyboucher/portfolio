import { renderHook } from '@testing-library/react'
import * as i18next from 'react-i18next'
import * as router from 'react-router'

import useLanguageNavigation from './useLanguageNavigation'

const translationMock = { i18n: { language: 'en' } } as unknown as ReturnType<typeof i18next.useTranslation>
const navigateMock: router.NavigateFunction = vi.fn()
const locationMock = { pathname: '/en/home' } as unknown as router.Location

describe('useLanguageNavigation (hooks)', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    vi.spyOn(i18next, 'useTranslation').mockReturnValue(translationMock)
    vi.spyOn(router, 'useNavigate').mockReturnValue(navigateMock)
    vi.spyOn(router, 'useLocation').mockReturnValue(locationMock)
  })

  it('returns navigation functions', () => {
    const { result } = renderHook(() => useLanguageNavigation())

    expect(result.current.navigateTo).toBeDefined()
    expect(result.current.redirectToLanguagePath).toBeDefined()
    expect(typeof result.current.navigateTo).toBe('function')
    expect(typeof result.current.redirectToLanguagePath).toBe('function')
  })

  it('navigates to path with language prefix', () => {
    const { result } = renderHook(() => useLanguageNavigation())

    result.current.navigateTo('/about')

    expect(navigateMock).toHaveBeenCalledWith('/en/about', { replace: true })
  })

  it('handles paths starting with slash', () => {
    const { result } = renderHook(() => useLanguageNavigation())

    result.current.navigateTo('/contact')

    expect(navigateMock).toHaveBeenCalledWith('/en/contact', { replace: true })
  })

  it('handles paths without leading slash', () => {
    const { result } = renderHook(() => useLanguageNavigation())

    result.current.navigateTo('products')

    expect(navigateMock).toHaveBeenCalledWith('/en/products', { replace: true })
  })

  it('respects replace option', () => {
    const { result } = renderHook(() => useLanguageNavigation())

    result.current.navigateTo('/about', { replace: false })

    expect(navigateMock).toHaveBeenCalledWith('/en/about', { replace: false })
  })

  it('defaults to replace: true when options not provided', () => {
    const { result } = renderHook(() => useLanguageNavigation())

    result.current.navigateTo('/home')

    expect(navigateMock).toHaveBeenCalledWith('/en/home', { replace: true })
  })

  it('uses different language when i18n language changes', () => {
    vi.spyOn(i18next, 'useTranslation').mockReturnValue({
      i18n: { language: 'fr' },
    } as unknown as ReturnType<typeof i18next.useTranslation>)

    const { result } = renderHook(() => useLanguageNavigation())

    result.current.navigateTo('/about')

    expect(navigateMock).toHaveBeenCalledWith('/fr/about', { replace: true })
  })

  it('navigates to language path when current path lacks language prefix', () => {
    vi.spyOn(router, 'useLocation').mockReturnValue({ pathname: '/about' } as unknown as router.Location)

    const { result } = renderHook(() => useLanguageNavigation())

    result.current.redirectToLanguagePath()

    expect(navigateMock).toHaveBeenCalledWith('/en/about', { replace: true })
  })

  it('does not navigate when path already has language prefix', () => {
    vi.spyOn(router, 'useLocation').mockReturnValue({ pathname: '/en/about' } as unknown as router.Location)

    const { result } = renderHook(() => useLanguageNavigation())

    result.current.redirectToLanguagePath()

    expect(navigateMock).not.toHaveBeenCalled()
  })

  it('extracts path correctly from prefixed pathname', () => {
    vi.spyOn(router, 'useLocation').mockReturnValue({ pathname: '/en/about/details' } as unknown as router.Location)

    const { result } = renderHook(() => useLanguageNavigation())

    result.current.redirectToLanguagePath()

    expect(navigateMock).not.toHaveBeenCalled()
  })

  it('handles root path without language prefix', () => {
    vi.spyOn(router, 'useLocation').mockReturnValue({ pathname: '/' } as unknown as router.Location)

    const { result } = renderHook(() => useLanguageNavigation())

    result.current.redirectToLanguagePath()

    expect(navigateMock).toHaveBeenCalledWith('/en/', { replace: true })
  })

  it('redirects to correct language when language changes', () => {
    vi.spyOn(i18next, 'useTranslation').mockReturnValue({
      i18n: { language: 'fr' },
    } as unknown as ReturnType<typeof i18next.useTranslation>)
    vi.spyOn(router, 'useLocation').mockReturnValue({ pathname: '/about' } as unknown as router.Location)

    const { result } = renderHook(() => useLanguageNavigation())

    result.current.redirectToLanguagePath()

    expect(navigateMock).toHaveBeenCalledWith('/fr/about', { replace: true })
  })

  it('navigates with empty path correctly', () => {
    const { result } = renderHook(() => useLanguageNavigation())

    result.current.navigateTo('')

    expect(navigateMock).toHaveBeenCalledWith('/en/', { replace: true })
  })

  it('handles slash-only path', () => {
    const { result } = renderHook(() => useLanguageNavigation())

    result.current.navigateTo('/')

    expect(navigateMock).toHaveBeenCalledWith('/en/', { replace: true })
  })

  it('replaces language prefix in pathname', () => {
    vi.spyOn(router, 'useLocation').mockReturnValue({ pathname: '/fr/about' } as unknown as router.Location)
    vi.spyOn(i18next, 'useTranslation').mockReturnValue({
      i18n: { language: 'en' },
    } as unknown as ReturnType<typeof i18next.useTranslation>)

    const { result } = renderHook(() => useLanguageNavigation())

    result.current.redirectToLanguagePath()

    expect(navigateMock).not.toHaveBeenCalled()
  })
})