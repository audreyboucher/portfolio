import { render } from '@testing-library/react'

import Section from './Section'
import styles from './Section.module.scss'

describe('Section (components/sections)', () => {
  it('properly renders the component', () => {
    const { getByLabelText } = render(<Section anchor="test" />)
    expect(getByLabelText('Section')).toBeInTheDocument()
  })

  it('sets the anchor to the main container', () => {
    const { getByLabelText } = render(<Section anchor="test" />)
    expect(getByLabelText('Section')).toHaveAttribute('id', 'test')
  })

  it('adapts styles to secondary background', () => {
    const { getByLabelText } = render(<Section anchor="test" background="secondary" />)
    expect(getByLabelText('Section')).toHaveClass(styles.secondaryBgColor)
  })

  it('renders the children', () => {
    const { getByLabelText } = render(<Section anchor="test"><div aria-label="children"></div></Section>)
    expect(getByLabelText('children')).toBeInTheDocument()
  })
})