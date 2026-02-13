import { render } from '@testing-library/react'

import Icon, { Icons } from './Icon'

describe('Icon (components/ui)', () => {
  it('properly renders the component', () => {
    const { getByAltText } = render(<Icon icon={Icons.Code} label="Icon" />)
    expect(getByAltText('Icon')).toBeInTheDocument()
  })

  it('displays the right icon', () => {
    const { getByAltText } = render(<Icon icon={Icons.Code} label="Icon" />)
    expect(getByAltText('Icon')).toHaveAttribute('data-variant', 'code')
  })
})