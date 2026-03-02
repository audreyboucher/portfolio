import { render } from '@testing-library/react'

import Footer from './Footer'

describe('Footer (components)', () => {
  it('properly renders the component', () => {
    const { getByRole } = render(<Footer />)
    expect(getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders the links and copyright', () => {
    const { getByText } = render(<Footer />)

    expect(getByText('LinkedIn')).toBeInTheDocument()
    expect(getByText('Location')).toBeInTheDocument()
    expect(getByText('Phone')).toBeInTheDocument()
    expect(getByText('Email')).toBeInTheDocument()
    expect(getByText('© Audrey Boucher 2026 | All Rights Reserved')).toBeInTheDocument()
  })
})