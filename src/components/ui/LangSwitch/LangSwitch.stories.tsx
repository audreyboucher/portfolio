import type { Meta, StoryObj } from '@storybook/react-vite'
import { I18nextProvider } from 'react-i18next'

import i18n, { defaultLanguage, Languages } from '@/i18next'

import LangSwitch from './LangSwitch'

const meta = {
  title: 'UI/LangSwitch',
  component: LangSwitch,
  argTypes: {
    disabled: {
      name: 'Disabled',
      control: 'boolean',
      description: "To enable/disable the switch of language",
      default: false,
    },
  },
  decorators: [
    (Story, context) => {
      const language = context.parameters.language || defaultLanguage
      i18n.changeLanguage(language)
      return (
        <I18nextProvider i18n={i18n}>
          <Story />
        </I18nextProvider>
      )
    },
  ],
  globals: {
    backgrounds: { value: 'dark' },
  },
} satisfies Meta<typeof LangSwitch>

export default meta
type Story = StoryObj<typeof meta>

export const English: Story = {
  args: {
    disabled: false,
  },
  parameters: {
    language: Languages.EN,
  },
}

export const French: Story = {
  args: {
    disabled: false,
  },
  parameters: {
    language: Languages.FR,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  parameters: {
    language: defaultLanguage,
  },
}