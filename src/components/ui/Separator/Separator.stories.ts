import type { Meta, StoryObj } from '@storybook/react-vite'

import Separator from './Separator'

const meta = {
  title: 'UI/Separator',
  component: Separator,
  argTypes: {
    direction: {
      name: 'Direction',
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Direction of the separator, either vertical or horizontal',
    },
    containerClassName: {
      name: 'ContainerClassName',
      control: 'text',
      description: 'ClassName to apply additional styles on the container of the separator',
    },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
  },
}

export const Vertical: Story = {
  args: {
    direction: 'vertical',
  },
}