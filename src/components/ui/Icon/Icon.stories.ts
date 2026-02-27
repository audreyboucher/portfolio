import type { Meta, StoryObj } from '@storybook/react-vite'

import Icon, { Icons } from './Icon'

import styles from './Icon.stories.module.scss'

const meta = {
  title: 'UI/Icon',
  component: Icon,
  argTypes: {
    icon: {
      name: 'Icon',
      control: 'select',
      options: Object.values(Icons),
      description: 'Name of the icon (list in /src/components/ui/Icon)',
    },
    label: {
      name: 'Text',
      control: 'text',
      description: "Image's alt attribute",
    },
    className: {
      name: 'ClassName',
      control: 'text',
      description: 'Additional styles'
    },
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Regular: Story = {
  args: {
    icon: Icons.Code,
  },
}

export const WithStyles: Story = {
  args: {
    icon: Icons.Code,
    className: styles.container,
  },
  globals: {
    backgrounds: { value: 'light' },
  },
}