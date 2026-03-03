import { render } from '@testing-library/react'

import ContactSection from './ContactSection'

describe('ContactSection (components/sections)', () => {
  it('properly renders the component', () => {
    const { getByLabelText } = render(<ContactSection />)
    expect(getByLabelText('Section')).toBeInTheDocument()
  })

  it('renders the contact form', () => {
    const { getByLabelText } = render(<ContactSection />)
    expect(getByLabelText('Contact Form')).toBeInTheDocument()
  })

  it('renders the Calendly widget', () => {
    const { getByTitle } = render(<ContactSection />)
    expect(getByTitle('Calendly Scheduling Page')).toBeInTheDocument()
  })
})