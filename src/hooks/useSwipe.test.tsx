import { renderHook } from '@testing-library/react'

import useSwipe from './useSwipe'

const createTouchEvent = (clientX: number, clientY: number) => {
  return {
    targetTouches: [{ clientX, clientY }],
  } as unknown as React.TouchEvent
}

describe('useSwipe (hooks)', () => {
  it('returns touch handlers', () => {
    const { result } = renderHook(() =>
      useSwipe({
        onSwipedLeft: vi.fn(),
        onSwipedRight: vi.fn(),
      })
    )

    expect(result.current.onTouchStart).toBeDefined()
    expect(result.current.onTouchMove).toBeDefined()
    expect(result.current.onTouchEnd).toBeDefined()
    expect(typeof result.current.onTouchStart).toBe('function')
    expect(typeof result.current.onTouchMove).toBe('function')
    expect(typeof result.current.onTouchEnd).toBe('function')
  })

  it('executes onTouchStart without error', () => {
    const { result } = renderHook(() => useSwipe({}))
    const startEvent = createTouchEvent(100, 50)

    expect(() => {
      result.current.onTouchStart(startEvent)
    }).not.toThrow()
  })

  it('executes onTouchMove without error', () => {
    const { result } = renderHook(() => useSwipe({}))
    const moveEvent = createTouchEvent(80, 50)

    expect(() => {
      result.current.onTouchMove(moveEvent)
    }).not.toThrow()
  })

  it('executes onTouchEnd without error', () => {
    const { result } = renderHook(() => useSwipe({}))

    expect(() => {
      result.current.onTouchEnd()
    }).not.toThrow()
  })

  it('handles touch sequence without error', () => {
    const onSwipedLeft = vi.fn()
    const { result } = renderHook(() => useSwipe({ onSwipedLeft }))

    expect(() => {
      result.current.onTouchStart(createTouchEvent(100, 50))
      result.current.onTouchMove(createTouchEvent(40, 50))
      result.current.onTouchEnd()
    }).not.toThrow()
  })

  it('handles multiple touch sequences', () => {
    const onSwipedLeft = vi.fn()
    const { result } = renderHook(() => useSwipe({ onSwipedLeft }))

    expect(() => {
      result.current.onTouchStart(createTouchEvent(100, 50))
      result.current.onTouchMove(createTouchEvent(40, 50))
      result.current.onTouchEnd()

      result.current.onTouchStart(createTouchEvent(100, 50))
      result.current.onTouchMove(createTouchEvent(40, 50))
      result.current.onTouchEnd()
    }).not.toThrow()
  })

  it('returns handlers that can be passed to event listeners', () => {
    const onSwipedLeft = vi.fn()
    const { result } = renderHook(() => useSwipe({ onSwipedLeft }))

    const handlers = {
      onTouchStart: result.current.onTouchStart,
      onTouchMove: result.current.onTouchMove,
      onTouchEnd: result.current.onTouchEnd,
    }

    expect(typeof handlers.onTouchStart).toBe('function')
    expect(typeof handlers.onTouchMove).toBe('function')
    expect(typeof handlers.onTouchEnd).toBe('function')
  })

  it('handles swipe with no callbacks specified', () => {
    const { result } = renderHook(() => useSwipe({}))

    expect(() => {
      result.current.onTouchStart(createTouchEvent(100, 50))
      result.current.onTouchMove(createTouchEvent(30, 50))
      result.current.onTouchEnd()
    }).not.toThrow()
  })

  it('handles vertical touch movements', () => {
    const onSwipedUp = vi.fn()
    const { result } = renderHook(() => useSwipe({ onSwipedUp }))

    expect(() => {
      result.current.onTouchStart(createTouchEvent(50, 100))
      result.current.onTouchMove(createTouchEvent(50, 40))
      result.current.onTouchEnd()
    }).not.toThrow()
  })

  it('handles partial callbacks being provided', () => {
    const onSwipedLeft = vi.fn()
    const onSwipedRight = vi.fn()
    const { result } = renderHook(() => useSwipe({ onSwipedLeft, onSwipedRight }))

    expect(() => {
      result.current.onTouchStart(createTouchEvent(100, 50))
      result.current.onTouchMove(createTouchEvent(40, 50))
      result.current.onTouchEnd()
    }).not.toThrow()
  })

  it('accepts all four directional callbacks', () => {
    const callbacks = {
      onSwipedLeft: vi.fn(),
      onSwipedRight: vi.fn(),
      onSwipedUp: vi.fn(),
      onSwipedDown: vi.fn(),
    }
    const { result } = renderHook(() => useSwipe(callbacks))

    expect(() => {
      result.current.onTouchStart(createTouchEvent(100, 50))
      result.current.onTouchMove(createTouchEvent(40, 50))
      result.current.onTouchEnd()
    }).not.toThrow()
  })
})