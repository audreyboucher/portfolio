import { render } from '@testing-library/react'

import Skill from './Skill'

describe('Skill (components)', () => {
  it('properly renders the component', () => {
    const { getByText } = render(<Skill name='React' value={80} />)
    expect(getByText('React')).toBeInTheDocument()
  })

  it('renders the tooltip when info is provided', () => {
    const info = 'I have been using it for 3 years and have built several projects with it, including this portfolio'
    const { getByRole } = render(<Skill name='React' value={80} info={info} />)

    expect(getByRole('tooltip')).toHaveTextContent(info)
  })
})