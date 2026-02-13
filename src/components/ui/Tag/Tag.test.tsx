import { render } from '@testing-library/react'

import Tag from './Tag'

describe('Tag (components/ui)', () => {
  it('renders the component properly', () => {
    const { getByText } = render(<Tag text="test" />)
    expect(getByText('test')).toBeInTheDocument()
  })

  describe('no specified variant (primary as default)', () => {
    it('renders the right variant', () => {
      const { getByText } = render(<Tag text="test" />)
      expect(getByText('test')).toHaveAttribute('data-variant', 'primary')
    })
  })

  describe('primary variant', () => {
    it('renders the right variant', () => {
      const { getByText } = render(<Tag type="primary" text="test" />)
      expect(getByText('test')).toHaveAttribute('data-variant', 'primary')
    })
  })

  describe('success variant', () => {
    it('renders the right variant', () => {
      const { getByText } = render(<Tag type="success" text="test" />)
      expect(getByText('test')).toHaveAttribute('data-variant', 'success')
    })
  })

  describe('error variant', () => {
    it('renders the right variant', () => {
      const { getByText } = render(<Tag type="error" text="test" />)
      expect(getByText('test')).toHaveAttribute('data-variant', 'error')
    })
  })
})