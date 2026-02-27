import { fireEvent, render, waitFor } from '@testing-library/react'

import Tooltip from './Tooltip'

describe('Tooltip (components/ui)', () => {
  it('properly renders the component', () => {
    const { getByRole } = render(<Tooltip text='This is a tooltip' />)
    expect(getByRole('tooltip')).toBeInTheDocument()
  })

  it('is accessible', () => {
    const { getByText } = render(<Tooltip text='This is a tooltip' />)

    expect(getByText('?').parentElement).toHaveAttribute('aria-describedby', 'tooltip')
    expect(getByText('?').parentElement).toHaveAttribute('tabIndex', '0')
  })

  describe('on desktop', () => {
    it('shows the tooltip on hover the question mark', () => {
      const { getByText, getByRole } = render(<Tooltip text='This is a tooltip' />)
      const computedStyle = getComputedStyle(getByRole('tooltip'))

      waitFor(() => {
        expect(computedStyle.visibility).toBe('hidden')
      })

      fireEvent.mouseMove(getByText('?'), { clientX: 100, clientY: 150 })

      waitFor(() => {
        expect(computedStyle.visibility).toBe('visible')
      })
    })

    it('updates the position of the tooltip on mouse move', () => {
      const { getByText, getByRole } = render(<Tooltip text='This is a tooltip' />)

      waitFor(() => {
        expect(getByRole('tooltip')).toHaveStyle('translateX: 0px')
        expect(getByRole('tooltip')).toHaveStyle('translateY: 0px')
      })

      fireEvent.mouseMove(getByText('?'), { clientX: 100, clientY: 150 })

      waitFor(() => {
        expect(getByRole('tooltip')).toHaveStyle('translateX: 100px')
        expect(getByRole('tooltip')).toHaveStyle('translateY: 150px')
      })
    })
  })

  describe('on mobile', () => {
    it('shows the tooltip on tap the question mark', () => {
      const { getByText, getByRole } = render(<Tooltip text='This is a tooltip' />)
      const computedStyle = getComputedStyle(getByRole('tooltip'))

      waitFor(() => {
        expect(computedStyle.visibility).toBe('hidden')
      })

      fireEvent.click(getByText('?'))

      waitFor(() => {
        expect(computedStyle.visibility).toBe('visible')
      })
    })
  })
})