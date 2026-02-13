import { render } from '@testing-library/react'

import Button from './Button'

describe('Button (components/ui)', () => {
  it('renders the component properly', () => {
    const { getByRole } = render(<Button />)
    expect(getByRole('button')).toBeInTheDocument()
  })

  it('is included into the keyboard navigation', () => {
    const { getByRole } = render(<Button />)
    expect(getByRole('button')).toHaveAttribute('tabindex', '0')
  })

  it('prints the text content', () => {
    const { getByText } = render(<Button text="Call to action" />)
    expect(getByText('Call to action')).toBeInTheDocument()
  })

  it('prints the child element as content', () => {
    const { getByLabelText } = render(<Button><span aria-label="Child element"></span></Button>)
    expect(getByLabelText('Child element')).toBeInTheDocument()
  })

  it('prints the text content over the child element', () => {
    const { getByText, queryByLabelText } = render(<Button text="Call to action"><span aria-label="Child element"></span></Button>)

    expect(getByText('Call to action')).toBeInTheDocument()
    expect(queryByLabelText('Child element')).not.toBeInTheDocument()
  })

  describe('disabled state', () => {
    it('prints the text content', () => {
      const { getByText } = render(<Button text="Call to action" disabled />)
      expect(getByText('Call to action')).toBeInTheDocument()
    })

    it('prints the child element as content', () => {
      const { getByLabelText } = render(<Button disabled><span aria-label="Child element"></span></Button>)
      expect(getByLabelText('Child element')).toBeInTheDocument()
    })

    it('disables the button', () => {
      const { getByRole } = render(<Button disabled />)

      expect(getByRole('button')).toHaveAttribute('disabled')
      expect(getByRole('button')).toHaveAttribute('aria-disabled')
    });

    it('excludes the button from the keyboard navigation', () => {
      const { getByRole } = render(<Button disabled />)
      expect(getByRole('button')).toHaveAttribute('tabindex', '-1')
    })
  })

  describe('loading state', () => {
    it('prints the loading element over the text content', () => {
      const { getByLabelText, queryByText } = render(<Button loading text="Call to action" />)

      expect(getByLabelText('Loading')).toBeInTheDocument()
      expect(queryByText('Call to action')).not.toBeInTheDocument()
    })

    it('prints the loading element over the child element', () => {
      const { getByLabelText, queryByLabelText } = render(<Button loading><span aria-label="Child element"></span></Button>)

      expect(getByLabelText('Loading')).toBeInTheDocument()
      expect(queryByLabelText('Child element')).not.toBeInTheDocument()
    })

    it('does not disable the button', () => {
      const { getByRole } = render(<Button loading />)

      expect(getByRole('button')).not.toHaveAttribute('disabled')
      expect(getByRole('button')).not.toHaveAttribute('aria-disabled')
    });

    it('excludes the button from the keyboard navigation', () => {
      const { getByRole } = render(<Button loading />)
      expect(getByRole('button')).toHaveAttribute('tabindex', '-1')
    })
  })
})