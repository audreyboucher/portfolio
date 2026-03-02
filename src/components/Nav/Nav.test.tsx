import { render, fireEvent, waitFor } from '@testing-library/react'

import Nav from './Nav'

describe('Nav (components)', () => {
  it('renders the component properly', () => {
    const { getByLabelText } = render(<Nav />)
    expect(getByLabelText('Menu')).toBeInTheDocument()
  })

  describe('mobile menu', () => {
    it('initially hides the menu', () => {
      const { container, getByLabelText } = render(<Nav />)
  
      expect(container).not.toHaveClass('isMenuOpened')
      expect(getByLabelText('Open menu')).toBeInTheDocument()
    })

    it('toggles the menu on click on the button', () => {
      const { container, getByLabelText } = render(<Nav />)

      fireEvent.click(getByLabelText('Open menu'))

      waitFor(() => {
        expect(container).toHaveClass('isMenuOpened')
        expect(getByLabelText('Close menu')).toBeInTheDocument()
      })
    })

    it('additionally contains source links and overlay element', () => {
      const { getByLabelText } = render(<Nav />)

      expect(getByLabelText('See this website’s code on GitHub')).toBeInTheDocument()
      expect(getByLabelText('See this website’s mockups on Figma')).toBeInTheDocument()
      expect(getByLabelText('See this website’s components on Storybook')).toBeInTheDocument()
      expect(getByLabelText('Close menu overlay')).toBeInTheDocument()
    })

    it('closes the menu on click on the overlay', () => {
      const { container, getByLabelText } = render(<Nav />)

      fireEvent.click(getByLabelText('Open menu'))

      waitFor(() => {
        expect(container).toHaveClass('isMenuOpened')
        expect(getByLabelText('Close menu')).toBeInTheDocument()
      })

      fireEvent.click(getByLabelText('Close menu overlay'))

      waitFor(() => {
        expect(container).not.toHaveClass('isMenuOpened')
        expect(getByLabelText('Open menu')).toBeInTheDocument()
      })
    })
  })
})