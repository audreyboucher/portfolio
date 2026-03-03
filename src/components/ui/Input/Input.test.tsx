import { render } from '@testing-library/react'

import Input from './Input'
import styles from './Input.module.scss'

describe('Input (components/ui)', () => {
  it('properly renders the component', () => {
    const { getByLabelText } = render(<Input type="text" label="Name" />)
    expect(getByLabelText('Name')).toBeInTheDocument()
  })
  
  describe('types', () => {
    it('renders the input element', () => {
      const { getByLabelText } = render(<Input type="text" label="Name" />)
      expect(getByLabelText('Name').tagName.toLowerCase()).toBe('input')
    })

    it('renders the textarea element', () => {
      const { getByLabelText } = render(<Input type="textarea" label="Description" />)
      expect(getByLabelText('Description').tagName.toLowerCase()).toBe('textarea')
    })
  })

  describe('disabled state', () => {
    it('sets the correct aria attributes', () => {
      const { getByLabelText } = render(<Input type="text" label="Name" disabled />)

      expect(getByLabelText('Name')).toHaveAttribute('aria-disabled', 'true')
      expect(getByLabelText('Name')).toHaveAttribute('tabindex', '-1')
    })

    it('properly applies the disabled styles', () => {
      const { getByLabelText } = render(<Input type="text" label="Name" disabled />)
      expect(getByLabelText('Name').parentElement).toHaveClass(styles.disabled)
    })

    it('disables the input element', () => {
      const { getByLabelText } = render(<Input type="text" label="Name" disabled />)
      expect(getByLabelText('Name')).toBeDisabled()
    })

    it('disables the textarea element', () => {
      const { getByLabelText } = render(<Input type="textarea" label="Description" disabled />)
      expect(getByLabelText('Description')).toBeDisabled()
    })
  })

  describe('error state', () => {
    it('sets the correct aria attributes', () => {
      const { getByLabelText } = render(<Input type="text" label="Name" error="This field is required" />)
      expect(getByLabelText('Name Error')).toBeInTheDocument()
    })

    it('properly applies the error styles', () => {
      const { getByLabelText } = render(<Input type="text" label="Name" error="This field is required" />)
      expect(getByLabelText('Name').parentElement).toHaveClass(styles.error)
    })

    it('renders the error message', () => {
      const { getByText } = render(<Input type="text" label="Name" error="This field is required" />)
      expect(getByText('This field is required')).toBeInTheDocument()
    })
  })
})