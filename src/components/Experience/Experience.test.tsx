import { render } from '@testing-library/react'

import Experience, { type ExperienceType } from './Experience'

const experience: ExperienceType = {
  company: 'Test Company',
  position: 'Test Position',
  description: ['Did something', 'Did something else'],
  contractType: 'Full-time',
  location: 'Test Location',
  date: [2020, 2022],
  tools: ['React', 'TypeScript'],
}

describe('Experience (components)', () => {
  it('properly renders the component', () => {
    const { getByText } = render(<Experience {...experience} />)
    expect(getByText(experience.company)).toBeInTheDocument()
  })

  it('renders the description as a list', () => {
    const { getByText } = render(<Experience {...experience} />)

    experience.description.forEach((item) => {
      expect(getByText(item)).toBeInTheDocument()
    })
  })

  it('renders the tools as icons with tooltips', () => {
    const { getByText, getByAltText } = render(<Experience {...experience} />)

    expect(getByText(experience.tools[0])).toHaveAttribute('role', 'tooltip')
    expect(getByAltText(experience.tools[0])).toBeInTheDocument()
  })

  it('renders the date in the correct format', () => {
    const { getByText } = render(<Experience {...experience} />)
    expect(getByText('2020-2022')).toBeInTheDocument()
  })

  it('renders the contract type and location', () => {
    const { getByText } = render(<Experience {...experience} />)

    expect(getByText(experience.contractType!)).toBeInTheDocument()
    expect(getByText(experience.location)).toBeInTheDocument()
  })

  it('renders the start date without a dash if the end date is not provided', () => {
    const { getByText } = render(<Experience {...experience} date={[2020]} />)
    expect(getByText('2020')).toBeInTheDocument()
  })
})