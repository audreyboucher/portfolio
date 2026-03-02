import { render } from '@testing-library/react'

import ExperiencesSection from './ExperiencesSection'
import styles from './ExperiencesSection.module.scss'

describe('ExperiencesSection (components/sections)', () => {
  it('properly renders the component', () => {
    const { getByLabelText } = render(<ExperiencesSection />)
    expect(getByLabelText('Section')).toBeInTheDocument()
  })

  it('renders the experiences from the translation file', () => {
    const { getByText } = render(<ExperiencesSection />)

    expect(getByText('Front-end developer')).toBeInTheDocument()
    expect(getByText('Graphic revamp of the whole website')).toBeInTheDocument()
  })

  describe('on desktop', () => {
    it('renders a vertical line between the experiences', () => {
      const { getByRole } = render(<ExperiencesSection />)
      expect(getByRole('separator')).toHaveClass(styles.desktopOnly)
    })
  })
})