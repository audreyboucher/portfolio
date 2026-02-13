import { render } from '@testing-library/react'

import { Icons } from '@/components/ui'

import SourceLink from './SourceLink'

const props = {
  text: "See the code",
  icon: Icons.Code,
  link: 'link-to-code',
}

describe('SourceLink (components)', () => {
  it('properly renders the component', () => {
    const { getByLabelText, getByText, getByAltText } = render(<SourceLink {...props} />)

    expect(getByLabelText('Source link')).toBeInTheDocument()
    expect(getByLabelText('Source link')).toHaveAttribute('href', props.link)
    expect(getByText(props.text)).toBeInTheDocument()
    expect(getByAltText('Source link')).toBeInTheDocument()
  })

  it('is accessible', () => {
    const { getByLabelText } = render(<SourceLink {...props} />)

    expect(getByLabelText('Source link')).not.toHaveAttribute('aria-disabled')
    expect(getByLabelText('Source link')).toHaveAttribute('tabindex', '0')
  })

  it('is not accessible when disabled', () => {
    const { getByLabelText } = render(<SourceLink {...props} disabled />)

    expect(getByLabelText('Source link')).toHaveAttribute('aria-disabled')
    expect(getByLabelText('Source link')).toHaveAttribute('tabindex', '-1')
  })
})