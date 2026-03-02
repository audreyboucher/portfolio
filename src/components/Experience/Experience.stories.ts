import type { Meta, StoryObj } from '@storybook/react-vite'

import Experience from './Experience'

const meta = {
  title: 'General/Experience',
  component: Experience,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    company: {
      name: 'Company',
      control: 'text',
      description: 'Name of the company',
    },
    position: {
      name: 'Position',
      control: 'text',
      description: 'Position held in the company',
    },
    description: {
      name: 'Description',
      control: 'object',
      description: 'List of responsibilities and achievements in the position',
    },
    contractType: {
      name: 'Contract Type',
      control: 'text',
      description: 'Type of contract (e.g., Full-time, Part-time, Internship)',
    },
    location: {
      name: 'Location',
      control: 'text',
      description: 'Location of the company or where the work was performed',
    },
    date: {
      name: 'Date',
      control: 'object',
      description: 'Start and end year of the experience (e.g., [2020, 2022] or [2020] if currently working)',
    },
    tools: {
      name: 'Tools',
      control: 'object',
      description: 'List of tools or technologies used in the position',
    },
    containerClassName: {
      name: 'ContainerClassName',
      control: 'text',
      description: 'Custom class name for the container element',
    },
  },
} satisfies Meta<typeof Experience>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    company: 'Example Company',
    position: 'Software Engineer',
    description: ['Developed web applications', 'Collaborated with cross-functional teams'],
    contractType: 'Full-time',
    location: 'Paris, France',
    date: [2020, 2022],
    tools: ['React', 'TypeScript', 'Node'],
    containerClassName: 'custom-container',
  },
}