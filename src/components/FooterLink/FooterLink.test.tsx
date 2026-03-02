import { render } from '@testing-library/react'

import FooterLink from './FooterLink'
import styles from './FooterLink.module.scss'

const props = {
  name: 'LinkedIn',
  detail: 'Go to profile',
  url: 'https://www.linkedin.com/in/audrey-boucher-43247159/',
}

describe('FooterLink (components)', () => {
  it('properly renders the component', () => {
    const { getByLabelText } = render(<FooterLink {...props} />)
    expect(getByLabelText('LinkedIn')).toBeInTheDocument()
  })

  it('renders the name and detail', () => {
    const { getByText } = render(<FooterLink {...props} />)

    expect(getByText(props.name)).toBeInTheDocument()
    expect(getByText(props.detail)).toBeInTheDocument()
  })

  it('renders an icon matching the name', () => {
    const { getByAltText } = render(<FooterLink {...props} />)
    expect(getByAltText('LinkedIn')).toBeInTheDocument()
  })

  describe('with url', () => {
    it('renders a link if a url is provided', () => {
      const { getByRole } = render(<FooterLink {...props} />)
      expect(getByRole('link', { name: props.name })).toHaveAttribute('href', props.url)
    })

    it('applies the call to action style if the url contains http', () => {
      const { getByText } = render(<FooterLink {...props} />)
      expect(getByText(props.detail)).toHaveClass(styles.callToAction)
    })
  })

  describe('without url', () => {
    it('renders a non-clickable element if no url is provided', () => {
      const { getByLabelText } = render(<FooterLink {...props} url={undefined} />)
      expect(getByLabelText(props.name)).toHaveClass(styles.nonClickable)
    })
  })
})