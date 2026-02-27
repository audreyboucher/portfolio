import { useRef } from 'react'
import { render, renderHook } from '@testing-library/react'

import useIsVisible from './useIsVisible'

const TestComponent = ({ onVisibilityChange }: { onVisibilityChange?: (visible: boolean) => void }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useIsVisible(ref)

  if (onVisibilityChange) onVisibilityChange(isVisible)

  return (
    <div>
      <div ref={ref} data-testid="observed-element">Content</div>
      <div data-testid="visibility-status">{isVisible ? 'visible' : 'hidden'}</div>
    </div>
  )
}

describe('useIsVisible (hooks)', () => {
  beforeEach(() => {
    global.IntersectionObserver = class IntersectionObserver {
      constructor(public callback: IntersectionObserverCallback) {}
      observe = vi.fn()
      unobserve = vi.fn()
      disconnect = vi.fn()
    } as unknown as typeof IntersectionObserver
  })

  it('renders without crashing', () => {
    const { getByTestId } = render(<TestComponent />)
    expect(getByTestId('observed-element')).toBeInTheDocument()
  })

  it('initializes with false visibility state', () => {
    const { getByTestId } = render(<TestComponent />)
    expect(getByTestId('visibility-status')).toHaveTextContent('hidden')
  })

  it('creates an IntersectionObserver instance', () => {
    const observeSpy = vi.fn()

    global.IntersectionObserver = class IntersectionObserver {
      constructor(public callback: IntersectionObserverCallback) {}
      observe = observeSpy
      unobserve = vi.fn()
      disconnect = vi.fn()
    } as unknown as typeof IntersectionObserver

    render(<TestComponent />)

    expect(observeSpy).toHaveBeenCalled()
  })

  it('observes the ref element', () => {
    const observeSpy = vi.fn()
    global.IntersectionObserver = class IntersectionObserver {
      constructor(public callback: IntersectionObserverCallback) {}
      observe = observeSpy
      unobserve = vi.fn()
      disconnect = vi.fn()
    } as unknown as typeof IntersectionObserver

    const { getByTestId } = render(<TestComponent />)
    const element = getByTestId('observed-element')

    expect(observeSpy).toHaveBeenCalledWith(element)
  })

  it('disconnects observer on unmount', () => {
    const disconnectSpy = vi.fn()
    global.IntersectionObserver = class IntersectionObserver {
      constructor(public callback: IntersectionObserverCallback) {}
      observe = vi.fn()
      unobserve = vi.fn()
      disconnect = disconnectSpy
    } as unknown as typeof IntersectionObserver

    const { unmount } = render(<TestComponent />)
    expect(disconnectSpy).not.toHaveBeenCalled()

    unmount()
    expect(disconnectSpy).toHaveBeenCalled()
  })

  it('returns a boolean state', () => {
    const { result } = renderHook(() => useIsVisible(useRef<HTMLDivElement>(null)))
    expect(typeof result.current).toBe('boolean')
  })

  it('returns false by default', () => {
    const { getByTestId } = render(<TestComponent />)
    expect(getByTestId('visibility-status')).toHaveTextContent('hidden')
  })

  it('handles missing ref gracefully', () => {
    const NullRefComponent = () => {
      const ref = useRef<HTMLDivElement>(null)

      useIsVisible(ref)

      return <div>No element</div>
    }

    expect(() => {
      render(<NullRefComponent />)
    }).not.toThrow()
  })
})