import type { Meta, StoryObj } from '@storybook/react-vite'

import { Icons } from '@/components/ui'

import SourceLink from './SourceLink'

const meta = {
  title: 'General/SourceLink',
  component: SourceLink,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    text: {
      name: 'Text',
      control: 'text',
      description: "Text content that's displayed on hover",
    },
    icon: {
      name: 'Icon',
      control: 'select',
      options: Object.values(Icons),
      description: "Name of the icon (list in /src/components/ui/Icon)",
    },
    link: {
      name: 'Link',
      control: 'text',
      description: "URL that's going to be opened in a new tab on click on the link",
    },
    disabled: {
      name: 'Disabled',
      control: 'boolean',
      description: "The link won't unfold on hover is this is true",
      default: false,
    },
  },
} satisfies Meta<typeof SourceLink>

export default meta
type Story = StoryObj<typeof meta>

export const Regular: Story = {
  args: {
    text: 'Know more',
    icon: Icons.Code,
    link: '#',
  },
}

export const Disabled: Story = {
  args: {
    text: 'Know more',
    icon: Icons.Code,
    link: '#',
    disabled: true,
  },
}