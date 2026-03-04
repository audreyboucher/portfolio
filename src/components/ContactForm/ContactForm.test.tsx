import { render, fireEvent, waitFor } from '@testing-library/react'

import ContactForm from './ContactForm'

describe('ContactForm (components)', () => {
  let postSpy: ReturnType<typeof vi.spyOn>

  const fillValidForm = (getByPlaceholderText: (text: string) => HTMLElement) => {
    fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'John Doe' } })
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } })
    fireEvent.change(getByPlaceholderText('Message'), {
      target: { value: 'This message is long enough to pass validation rules.' },
    })
  }

  beforeEach(async () => {
    postSpy = vi.spyOn((await import('axios')).default, 'post').mockResolvedValue({ data: { ok: true } } as never)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('properly renders the component', () => {
    const { getByLabelText } = render(<ContactForm />)
    expect(getByLabelText('Contact Form')).toBeInTheDocument()
  })

  describe('name field validation', () => {
    it('validates that the name field is required', () => {
      const { getByLabelText, getByRole } = render(<ContactForm />)

      fireEvent.click(getByRole('button'))

      waitFor(() => {
        expect(getByLabelText('Name Error')).toHaveTextContent('This field is required')
      })
    })

    it('validates that the name field has a minimum length of 3 characters', () => {
      const { getByLabelText, getByRole, getByPlaceholderText } = render(<ContactForm />)

      fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'Jo' } })
      fireEvent.click(getByRole('button'))

      waitFor(() => {
        expect(getByLabelText('Name Error')).toHaveTextContent('This field must have at least 3 characters')
      })
    })

    it('validates that the name field has a maximum length of 30 characters', () => {
      const { getByLabelText, getByRole, getByPlaceholderText } = render(<ContactForm />)

      fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'J'.repeat(31) } })
      fireEvent.click(getByRole('button'))

      waitFor(() => {
        expect(getByLabelText('Name Error')).toHaveTextContent('This field must have at most 30 characters')
      })
    })
  })

  describe('email field validation', () => {
    it('validates that the email field is required', () => {
      const { getByLabelText, getByRole } = render(<ContactForm />)

      fireEvent.click(getByRole('button'))

      waitFor(() => {
        expect(getByLabelText('Email Error')).toHaveTextContent('This field is required')
      })
    })
  
    it('validates that the email field has a minimum length of 10 characters', () => {
      const { getByLabelText, getByRole, getByPlaceholderText } = render(<ContactForm />)

      fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'a@b.c' } })
      fireEvent.click(getByRole('button'))

      waitFor(() => {
        expect(getByLabelText('Email Error')).toHaveTextContent('This field must have at least 10 characters')
      })
    })
  
    it('validates that the email field has a maximum length of 200 characters', () => {
      const { getByLabelText, getByRole, getByPlaceholderText } = render(<ContactForm />)

      fireEvent.change(getByPlaceholderText('Email'), { target: { value: `${'a'.repeat(191)}@example.com` } })
      fireEvent.click(getByRole('button'))

      waitFor(() => {
        expect(getByLabelText('Email Error')).toHaveTextContent('This field must have at most 200 characters')
      })
    })
  
    it('validates that the email field has a valid email format', () => {
      const { getByLabelText, getByRole, getByPlaceholderText } = render(<ContactForm />)

      fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'invalid-email' } })
      fireEvent.click(getByRole('button'))

      waitFor(() => {
        expect(getByLabelText('Email Error')).toHaveTextContent('This field must be a valid email address')
      })
    })
  })

  describe('message field validation', () => {
    it('validates that the message field is required', () => {
      const { getByLabelText, getByRole } = render(<ContactForm />)

      fireEvent.click(getByRole('button'))

      waitFor(() => {
        expect(getByLabelText('Message Error')).toHaveTextContent('This field is required')
      })
    })

    it('validates that the message field has a minimum length of 20 characters', () => {
      const { getByLabelText, getByRole, getByPlaceholderText } = render(<ContactForm />)

      fireEvent.change(getByPlaceholderText('Message'), { target: { value: 'Short message' } })
      fireEvent.click(getByRole('button'))

      waitFor(() => {
        expect(getByLabelText('Message Error')).toHaveTextContent('This field must have at least 20 characters')
      })
    })
  })

  describe('during submission', () => {
    it('displays the loading state during submission', () => {
      const { getByRole, getByLabelText } = render(<ContactForm />)

      fireEvent.click(getByRole('button'))

      waitFor(() => {
        expect(getByLabelText('Contact Form')).toHaveClass('loading')
      })
    })
  })

  describe('successful submission', () => {
    it('displays the success message on successful submission', () => {
      const { getByPlaceholderText, getByRole, getByLabelText } = render(<ContactForm />)

      fillValidForm(getByPlaceholderText)
      fireEvent.click(getByRole('button'))

      waitFor(() => {
        expect(getByLabelText('Success Message')).toBeInTheDocument()
      })
    })

    it('calls /api/contact/ with form payload', () => {
      const { getByPlaceholderText, getByRole } = render(<ContactForm />)

      fillValidForm(getByPlaceholderText)
      fireEvent.click(getByRole('button'))

      waitFor(() => {
        expect(postSpy).toHaveBeenCalledTimes(1)
        expect(postSpy).toHaveBeenCalledWith(
          `${import.meta.env.VITE_API_URL}/api/contact/`,
          expect.objectContaining({
            name: 'John Doe',
            email: 'john.doe@example.com',
            message: 'This message is long enough to pass validation rules.',
          }),
        )
      })
    })

    it('resets the form after submission', () => {
      const { getByPlaceholderText, getByRole } = render(<ContactForm />)

      fillValidForm(getByPlaceholderText)
      fireEvent.click(getByRole('button'))

      waitFor(() => {
        expect(getByPlaceholderText('Name')).toHaveValue('')
        expect(getByPlaceholderText('Email')).toHaveValue('')
        expect(getByPlaceholderText('Message')).toHaveValue('')
      })
    })
  })

  describe('failed submission', () => {
    it('displays the error message on failed submission', () => {
      const { getByPlaceholderText, getByRole, getByLabelText } = render(<ContactForm />)

      fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'Name' } })
      fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'invalid-email' } })
      fireEvent.change(getByPlaceholderText('Message'), { target: { value: 'This is a long enough message to pass validation' } })
      fireEvent.click(getByRole('button'))

      waitFor(() => {
        expect(getByLabelText('Error Message')).toBeInTheDocument()
      })
    })

    it('displays the error message when the request fails', async () => {
      postSpy = vi.spyOn((await import('axios')).default, 'post').mockRejectedValueOnce(new Error('Mocked API failure'))

      const { getByPlaceholderText, getByRole, getByLabelText } = render(<ContactForm />)

      fillValidForm(getByPlaceholderText)
      fireEvent.click(getByRole('button'))

      waitFor(() => {
        expect(getByLabelText('Error Message')).toBeInTheDocument()
      })
    })

    it('does not reset the form after submission', () => {
      const { getByPlaceholderText, getByRole } = render(<ContactForm />)

      fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'Name' } })
      fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'invalid-email' } })
      fireEvent.change(getByPlaceholderText('Message'), { target: { value: 'This is a long enough message to pass validation' } })
      fireEvent.click(getByRole('button'))

      waitFor(() => {
        expect(getByPlaceholderText('Name')).toHaveValue('Name')
        expect(getByPlaceholderText('Email')).toHaveValue('invalid-email')
        expect(getByPlaceholderText('Message')).toHaveValue('This is a long enough message to pass validation')
      })
    })
  })
})