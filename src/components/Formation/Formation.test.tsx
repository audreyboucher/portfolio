import { render } from '@testing-library/react'

import Formation, { type Props as FormationType } from './Formation'

const formation: FormationType = {
  name: 'Test Formation',
  school: 'Test School',
  description: ['Description 1', 'Description 2'],
  date: [2020, 2022],
}

describe('Formation (components)', () => {
  it('properly renders the component', () => {
    const { getByLabelText } = render(<Formation {...formation} />)
    expect(getByLabelText('Formation')).toBeInTheDocument()
  })

  it('displays the correct information', () => {
    const { getByText } = render(<Formation {...formation} />)

    expect(getByText('2020 - 2022')).toBeInTheDocument()
    expect(getByText(formation.name)).toBeInTheDocument()
    expect(getByText(formation.school)).toBeInTheDocument()

    formation.description.forEach((desc) => {
      expect(getByText(desc)).toBeInTheDocument()
    })
  })

  it('handles missing end date', () => {
    const { getByText } = render(<Formation {...formation} date={[2020]} />)
    expect(getByText('2020')).toBeInTheDocument()
  })
})