import { render } from '@testing-library/react'

import AboutMeSection from './AboutMeSection'

describe('AboutMeSection (components)', () => {
  it('properly renders the component', () => {
    const { getByLabelText } = render(<AboutMeSection />)

    expect(getByLabelText('Carousel')).toBeInTheDocument()
    expect(getByLabelText('Accordion')).toBeInTheDocument()
  })
})