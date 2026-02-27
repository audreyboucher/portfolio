import { render } from '@testing-library/react'

import SkillsSection from './SkillsSection'

describe('SkillsSection (components/sections)', () => {
  it('properly renders the component', () => {
    const { getByLabelText } = render(<SkillsSection />)

    expect(getByLabelText('Section')).toBeInTheDocument()
    expect(getByLabelText('Section')).toHaveAttribute('id', 'skills')
  })

  it('renders the correct number of skills', () => {
    const { getAllByRole } = render(<SkillsSection />)
    expect(getAllByRole('listitem')).toHaveLength(16)
  })
})