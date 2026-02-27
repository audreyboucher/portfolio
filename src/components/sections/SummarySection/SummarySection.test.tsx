import { render, fireEvent, waitFor } from '@testing-library/react'

import { renderWithProviders } from '@/utils/tests'
import { Languages } from '@/i18next'

import SummarySection from './SummarySection'

describe('SummarySection (components/sections)', () => {
  it('properly renders the component', () => {
    const { getByLabelText } = render(<SummarySection />)

    expect(getByLabelText('Section')).toBeInTheDocument()
    expect(getByLabelText('Section')).toHaveAttribute('id', 'home')
  })

  it('renders the text carousel', () => {
    const { getByLabelText } = render(<SummarySection />)

    waitFor(() => {
      expect(getByLabelText('Text Carousel')).toBeInTheDocument()
    })
  })

  it('opens the resume on click on the button', () => {
    const { getByLabelText } = render(<SummarySection />)
    const openAction = vi.fn()

    Object.defineProperty(window, 'open', { value: openAction })

    fireEvent.click(getByLabelText('Download Resume'))

    waitFor(() => {
      expect(openAction).toHaveBeenCalledWith(expect.stringContaining('Resume - Audrey BOUCHER EN.pdf'))
    })
  })

  it('renders the source links', () => {
    const { getAllByLabelText } = render(<SummarySection />)

    expect(getAllByLabelText('Source link')).toHaveLength(3)
  })

  describe('EN language', () => {
    it('opens the EN resume', () => {
      const { getByLabelText } = renderWithProviders(<SummarySection />, { language: Languages.EN })
      const openAction = vi.fn()

      Object.defineProperty(window, 'open', { value: openAction })

      fireEvent.click(getByLabelText('Download Resume'))

      waitFor(() => {
        expect(openAction).toHaveBeenCalledWith('Resume - Audrey BOUCHER EN.pdf')
      })
    })
  })

  describe('FR language', () => {
    it('opens the FR resume', () => {
      const { getByLabelText } = renderWithProviders(<SummarySection />, { language: Languages.FR })
      const openAction = vi.fn()

      Object.defineProperty(window, 'open', { value: openAction })

      fireEvent.click(getByLabelText('Download Resume'))

      waitFor(() => {
        expect(openAction).toHaveBeenCalledWith('CV - Audrey Boucher FR.pdf')
      })
    })
  })
})