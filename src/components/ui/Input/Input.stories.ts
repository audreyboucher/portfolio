import type { Meta, StoryObj } from '@storybook/react-vite'

import Input from './Input'

const meta = {
  title: 'UI/Input',
  component: Input,
  argTypes: {
    type: {
      name: 'Type',
      control: 'select',
      options: ['text', 'email', 'password', 'textarea'],
      description: 'The type of the input field',
      default: 'text',
    },
    label: {
      name: 'Label',
      control: 'text',
      description: 'The label for the input field',
      default: 'Input Label',
    },
    error: {
      name: 'Error',
      control: 'text',
      description: 'The error message to display (if any)',
      default: '',
    },
    disabled: {
      name: 'Disabled',
      control: 'boolean',
      description: 'Whether the input field is disabled',
      default: false,
    },
    onChange: {
      action: 'changed',
      description: 'Event handler for when the input value changes',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Regular: Story = {
  args: {
    type: 'text',
    label: 'Input Label',
    error: '',
  },
}

export const WithError: Story = {
  args: {
    type: 'text',
    label: 'Input Label',
    error: 'This is an error message',
  },
}

export const Textarea: Story = {
  args: {
    type: 'textarea',
    label: 'Textarea Label',
    error: '',
  },
}

export const Disabled: Story = {
  args: {
    type: 'text',
    label: 'Disabled Input',
    error: '',
    disabled: true,
  },
}

export const DisabledWithError: Story = {
  args: {
    type: 'text',
    label: 'Disabled Input with Error',
    error: 'This is an error message',
    disabled: true,
  },
}