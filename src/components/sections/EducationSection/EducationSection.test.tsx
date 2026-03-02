import { render } from '@testing-library/react'

import EducationSection from './EducationSection'

describe('EducationSection (components/sections)', () => {
  it('properly renders the component', () => {
    const { getByLabelText } = render(<EducationSection />)
    expect(getByLabelText('Section')).toBeInTheDocument()
  })

  it('displays the correct information', () => {
    const { getByText } = render(<EducationSection />)

    expect(getByText('iesa.name')).toBeInTheDocument()
    expect(getByText('42.name')).toBeInTheDocument()
  })
})