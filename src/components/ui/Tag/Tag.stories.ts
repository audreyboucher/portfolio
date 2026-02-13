import type { Meta, StoryObj } from '@storybook/react-vite'

import Tag from './Tag'

const meta = {
  title: 'UI/Tag',
  component: Tag,
  argTypes: {
    text: {
      name: 'Text',
      control: 'text',
      description: "Short piece of text to display within the tag",
    },
    type: {
      name: 'Type',
      control: 'select',
      options: ['primary', 'success', 'error'],
      description: "Impacts the tag's colors",
      default: 'primary',
    },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    text: 'Coming soon',
    type: 'primary',
  },
}

export const Success: Story = {
  args: {
    text: 'Done!',
    type: 'success',
  },
}

export const Error: Story = {
  args: {
    text: 'Wrong!',
    type: 'error',
  },
}