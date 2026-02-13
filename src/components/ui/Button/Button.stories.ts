import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/react-vite'

import Button from './Button'

const meta = {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    text: {
      name: 'Text',
      control: 'text',
      description: "Button's text content",
      default: 'Click me',
    },
    children: {
      name: 'Children',
      description: "Button's content (the text would be prioritized over a children component)",
    },
    disabled: {
      name: 'Disabled',
      control: 'boolean',
      description: "Prevents event from firing when true",
      default: false,
    },
    loading: {
      name: 'Loading',
      control: 'boolean',
      description: "Prints a loading state and prevents from clicking again",
      default: false,
    },
    onClick: {
      name: 'OnClick',
      description: "Event triggered on click on the button",
      default: fn(),
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Regular: Story = {
  args: {
    text: 'Click me',
  },
}

export const Disabled: Story = {
  args: {
    text: 'Click me',
    disabled: true,
  },
}

export const Loading: Story = {
  args: {
    text: 'Click me',
    loading: true,
  },
}