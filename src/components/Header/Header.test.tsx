import { render, fireEvent, waitFor } from '@testing-library/react'

import * as scrollUtils from '@/utils/scroll'

import Header from './Header'

describe('Header (components)', () => {
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn()
  })

  it('renders the component properly', () => {
    const { container } = render(<Header />)
    expect(container).toBeInTheDocument()
  })

  it('contains the title and logo', () => {
    const { getByLabelText } = render(<Header />)

    expect(getByLabelText('Logo')).toBeInTheDocument()
    expect(getByLabelText('Title')).toBeInTheDocument()
  })

  it('contains the nav', () => {
    const { getByLabelText } = render(<Header />)
    expect(getByLabelText('Menu')).toBeInTheDocument()
  })

  it('scroll to the top section on click on the title or logo', () => {
    const { getByLabelText } = render(
      <>
        <Header />
        <div id="home" />
      </>
    )

    const scrollToAnchor = vi.spyOn(scrollUtils, 'scrollToAnchor')
    
    fireEvent.click(getByLabelText('Scroll to top'))

    waitFor(() => {
      expect(scrollToAnchor).toHaveBeenCalledWith('home')
    })
  })
})