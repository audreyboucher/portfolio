import { fireEvent, waitFor } from '@testing-library/react'

import { Languages } from '@/i18next'
import { renderWithProviders } from '@/utils/tests'

import LangSwitch from './LangSwitch'

describe('LangSwitch (components/ui)', () => {
  it('renders the component properly', () => {
    const { getByLabelText, getByDisplayValue } = renderWithProviders(<LangSwitch />)

    waitFor(() => {
      expect(getByLabelText('Language Switch')).toBeInTheDocument()
      expect(getByDisplayValue('en')).toBeChecked()
      expect(getByDisplayValue('fr')).not.toBeChecked()
    })
  })

  it('is accessible', () => {
    const { getByLabelText } = renderWithProviders(<LangSwitch />)
    expect(getByLabelText('Language Switch')).toHaveAttribute('tabindex', '0')
  })

  it('is excluded from keyboard navigation when disabled', () => {
    const { getByLabelText } = renderWithProviders(<LangSwitch disabled />)
    expect(getByLabelText('Language Switch')).toHaveAttribute('tabindex', '-1')
  })

  it('adapts to the current language', () => {
    const { getByDisplayValue } = renderWithProviders(<LangSwitch />, { language: Languages.FR })

    waitFor(() => {
      expect(getByDisplayValue('fr')).toBeChecked()
      expect(getByDisplayValue('en')).not.toBeChecked()
    })
  })

  it('toggles the language on click on it', async () => {
    const onLanguageChangeAction = vi.fn()
    const { getByLabelText, getByDisplayValue } = renderWithProviders(<LangSwitch />, { changeLanguage: onLanguageChangeAction })

    fireEvent.click(getByLabelText('Language Switch'))

    waitFor(() => {
      expect(onLanguageChangeAction).toHaveBeenCalledWith(Languages.FR)
      expect(getByDisplayValue('fr')).toBeChecked()
    })
  })

  it('toggles the language on pressing the space key', async () => {
    const onLanguageChangeAction = vi.fn()
    const { getByLabelText, getByDisplayValue } = renderWithProviders(<LangSwitch />, { changeLanguage: onLanguageChangeAction })

    fireEvent.keyUp(getByLabelText('Language Switch'), { key: ' ' })

    waitFor(() => {
      expect(onLanguageChangeAction).toHaveBeenCalledWith(Languages.FR)
      expect(getByDisplayValue('fr')).toBeChecked()
    })
  })

  it('toggles the language on pressing the enter key', async () => {
    const onLanguageChangeAction = vi.fn()
    const { getByLabelText, getByDisplayValue } = renderWithProviders(<LangSwitch />, { changeLanguage: onLanguageChangeAction })

    fireEvent.keyUp(getByLabelText('Language Switch'), { key: 'Enter' })

    waitFor(() => {
      expect(onLanguageChangeAction).toHaveBeenCalledWith(Languages.FR)
      expect(getByDisplayValue('fr')).toBeChecked()
    })
  })
})