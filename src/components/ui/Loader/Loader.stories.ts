import type { Meta, StoryObj } from '@storybook/react-vite'

import Loader from './Loader'

const meta = {
  title: 'UI/Loader',
  component: Loader,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isLoading: {
      name: 'IsLoading',
      control: 'boolean',
      description: "To force the display of the loader (otherwise it disappears once the page is loaded)",
      default: false,
    },
  },
} satisfies Meta<typeof Loader>

export default meta
type Story = StoryObj<typeof meta>

export const Regular: Story = {
  args: {
    isLoading: true,
  },
  globals: {
    backgrounds: { style: 'dark' },
  },
}