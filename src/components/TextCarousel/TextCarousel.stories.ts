import type { Meta, StoryObj } from '@storybook/react-vite'

import TextCarousel from './TextCarousel'

const meta = {
  title: 'General/TextCarousel',
  component: TextCarousel,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    words: {
      name: 'Words',
      control: 'object',
      description: "Array of words to be displayed in the carousel. The first word won't be shuffled but the rest will be.",
    },
    textClassName: {
      name: 'TextClassName',
      control: 'text',
      description: 'Additional class name for the text elements',
    },
  },
} satisfies Meta<typeof TextCarousel>

export default meta
type Story = StoryObj<typeof meta>

export const Regular: Story = {
  args: {
    words: ['Hello', 'World', 'This', 'Is', 'A', 'Test'],
  },
}