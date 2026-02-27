import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/react-vite'

import Logo, { Version } from './Logo'

const meta = {
  title: 'UI/Logo',
  component: Logo,
  argTypes: {
    version: {
      name: 'Version',
      control: 'select',
      options: Object.values(Version),
      description: 'Variant colors for the logo',
      default: Version.Dark,
    },
    size: {
      name: 'Size',
      control: 'number',
      description: 'Width of the logo (the height will automatically adapt)',
      default: 50,
    },
    onClick: {
      name: 'OnClick',
      description: 'Event triggered on click on the logo',
      default: fn(),
    },
    containerClassName: {
      name: 'ContainerClassName',
      description: 'ClassName to apply additional styles on the container',
      control: 'text',
    },
  },
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Dark: Story = {
  args: {
    version: Version.Dark,
  },
}

export const Light: Story = {
  globals: {
    backgrounds: { value: 'dark' },
  },
  args: {
    version: Version.Light,
  },
}

export const Primary: Story = {
  args: {
    version: Version.Primary,
  },
}