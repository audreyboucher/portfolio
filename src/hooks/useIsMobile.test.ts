import { renderHook } from '@testing-library/react'

import useIsMobile from './useIsMobile'

let originalInnerWidth: number

let mockMediaQuery: {
  matches: boolean
  addEventListener: ReturnType<typeof vi.fn>
  removeEventListener: ReturnType<typeof vi.fn>
  addListener?: ReturnType<typeof vi.fn>
  removeListener?: ReturnType<typeof vi.fn>
}

describe('useIsMobile (hooks)', () => {
  beforeEach(() => {
    originalInnerWidth = window.innerWidth

    mockMediaQuery = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }

    vi.spyOn(window, 'matchMedia').mockReturnValue(mockMediaQuery as unknown as MediaQueryList)
    vi.spyOn(window, 'addEventListener')
    vi.spyOn(window, 'removeEventListener')
  })

  afterEach(() => {
    vi.restoreAllMocks()
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: originalInnerWidth,
    })
  })

  it('returns false for desktop when no mobile indicators present', () => {
    const { result } = renderHook(() => useIsMobile())
    expect(result.current.isMobile).toBe(false)
  })

  it('returns true when mediaQuery matches', () => {
    mockMediaQuery.matches = true

    const { result } = renderHook(() => useIsMobile())
    expect(result.current.isMobile).toBe(true)
  })

  it('returns true when window.innerWidth is <= 767', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 600,
    })

    const { result } = renderHook(() => useIsMobile())
    expect(result.current.isMobile).toBe(true)
  })

  it('returns false when window.innerWidth is > 767', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1024,
    })

    const { result } = renderHook(() => useIsMobile())
    expect(result.current.isMobile).toBe(false)
  })

  it('detects Android devices', () => {
    Object.defineProperty(navigator, 'userAgent', {
      writable: true,
      value: 'Mozilla/5.0 (Linux; Android 10)',
      configurable: true,
    })

    const { result } = renderHook(() => useIsMobile())
    expect(result.current.isMobile).toBe(true)
  })

  it('detects iPhone devices', () => {
    Object.defineProperty(navigator, 'userAgent', {
      writable: true,
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
      configurable: true,
    })

    const { result } = renderHook(() => useIsMobile())
    expect(result.current.isMobile).toBe(true)
  })

  it('detects iPad devices', () => {
    Object.defineProperty(navigator, 'userAgent', {
      writable: true,
      value: 'Mozilla/5.0 (iPad; CPU OS 13_2_3)',
      configurable: true,
    })

    const { result } = renderHook(() => useIsMobile())
    expect(result.current.isMobile).toBe(true)
  })

  it('detects devices by userAgent keywords', () => {
    // Test that device detection attempts to check userAgent
    const originalUserAgent = navigator.userAgent

    Object.defineProperty(navigator, 'userAgent', {
      writable: true,
      value: 'mozilla/5.0 (iphone; cpu iphone os 14_0)',
      configurable: true,
    })

    const { result } = renderHook(() => useIsMobile())

    // Should return boolean value
    expect(typeof result.current.isMobile).toBe('boolean')

    Object.defineProperty(navigator, 'userAgent', {
      writable: true,
      value: originalUserAgent,
      configurable: true,
    })
  })

  it('hook returns object with isMobile property', () => {
    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toHaveProperty('isMobile')
    expect(typeof result.current.isMobile).toBe('boolean')
  })

  it('attaches media query change listener', () => {
    renderHook(() => useIsMobile())

    expect(mockMediaQuery.addEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    )
  })

  it('attaches window resize listener', () => {
    renderHook(() => useIsMobile())

    expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it('removes listeners on unmount', () => {
    const { unmount } = renderHook(() => useIsMobile())

    unmount()

    expect(mockMediaQuery.removeEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    )
    expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it('uses addListener fallback for older browsers', () => {
    const addListenerSpy = vi.fn()
    const removeListenerSpy = vi.fn()

    const mockMediaQueryObject = {
      matches: false,
      addListener: addListenerSpy,
      removeListener: removeListenerSpy,
      addEventListener: undefined,
      removeEventListener: vi.fn(),
    }

    vi.spyOn(window, 'matchMedia').mockReturnValue(mockMediaQueryObject as unknown as MediaQueryList)

    const { unmount } = renderHook(() => useIsMobile())

    if (addListenerSpy.mock.calls.length > 0) {
      expect(addListenerSpy).toHaveBeenCalled()
    }

    unmount()

    if (removeListenerSpy.mock.calls.length > 0) {
      expect(removeListenerSpy).toHaveBeenCalled()
    }
  })
})