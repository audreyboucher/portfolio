import type { Meta, StoryObj } from '@storybook/react-vite'

import Section from './Section'

const meta = {
  title: 'General/Section',
  component: Section,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    anchor: {
      name: 'Anchor',
      control: 'text',
      description: "ID of the section, used for navigation and linking",
    },
    background: {
      name: 'Background',
      control: 'select',
      options: ['primary', 'secondary'],
      description: "Background color of the section",
    },
    containerClassName: {
      name: 'ContainerClassName',
      control: 'text',
      description: "Additional class name for the section container, allowing for custom styling.",
    },
    children: {
      name: 'Children',
      control: 'text',
      description: "React element to be displayed inside the section",
    },
  },
} satisfies Meta<typeof Section>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    anchor: 'home',
    children: <p>This is a primary section. You can put any content here.</p>,
  },
}

export const Secondary: Story = {
  args: {
    anchor: 'about',
    background: 'secondary',
    children: <p>This is a secondary section. You can put any content here.</p>,
  },
}