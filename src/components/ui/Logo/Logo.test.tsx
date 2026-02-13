import { render, fireEvent } from '@testing-library/react'

import Logo, { getHeightFromWidth, initialWidth, Version } from './Logo'

describe('Logo (components/ui)', () => {
  it('renders the component properly', () => {
    const { getByLabelText } = render(<Logo />)
    expect(getByLabelText('Logo')).toBeInTheDocument()
  })

  it('keeps the size ratio with a custom size', () => {
    const { getByLabelText } = render(<Logo size={100} />)

    expect(getByLabelText('Logo').querySelector('svg')).toBeInTheDocument()
    expect(getByLabelText('Logo').querySelector('svg')).toHaveAttribute('width', '100')
    expect(getByLabelText('Logo').querySelector('svg')).toHaveAttribute('height', '96')
    expect(getByLabelText('Logo').querySelector('svg')).toHaveAttribute('viewBox', `0 0 ${initialWidth} ${getHeightFromWidth(initialWidth)}`)
  })

  it('triggers an action on click', () => {
    const clickAction = vi.fn()
    const { getByLabelText } = render(<Logo onClick={clickAction} />)

    expect(clickAction).not.toHaveBeenCalled()

    fireEvent.click(getByLabelText('Logo'))

    expect(clickAction).toHaveBeenCalledTimes(1)
  })

  describe('no variant specified (dark as default)', () => {
    it('renders the component properly', () => {
      const { getByLabelText } = render(<Logo />)

      expect(getByLabelText('Logo')).toBeInTheDocument()
      expect(getByLabelText('Logo')).toHaveAttribute('data-variant', 'logo_dark')
    })
  })

  describe('dark variant', () => {
    it('renders the component properly', () => {
      const { getByLabelText } = render(<Logo version={Version.Dark} />)

      expect(getByLabelText('Logo')).toBeInTheDocument()
      expect(getByLabelText('Logo')).toHaveAttribute('data-variant', 'logo_dark')
    })
  })

  describe('light variant', () => {
    it('renders the component properly', () => {
      const { getByLabelText } = render(<Logo version={Version.Light} />)

      expect(getByLabelText('Logo')).toBeInTheDocument()
      expect(getByLabelText('Logo')).toHaveAttribute('data-variant', 'logo_light')
    })
  })

  describe('primary variant', () => {
    it('renders the component properly', () => {
      const { getByLabelText } = render(<Logo version={Version.Primary} />)

      expect(getByLabelText('Logo')).toBeInTheDocument()
      expect(getByLabelText('Logo')).toHaveAttribute('data-variant', 'logo_primary')
    })
  })
})