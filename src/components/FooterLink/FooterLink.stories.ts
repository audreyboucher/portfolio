import type { Meta, StoryObj } from '@storybook/react-vite'

import FooterLink from './FooterLink'

const meta: Meta<typeof FooterLink> = {
  title: 'General/FooterLink',
  component: FooterLink,
  argTypes: {
    name: {
      name: 'Name',
      control: 'text',
      description: 'The name of the link, e.g. "LinkedIn" or "Email".'
    },
    detail: {
      name: 'Detail',
      control: 'text',
      description: 'Additional information about the link, e.g. "Go to profile" or "Send an email".'
    },
    url: {
      name: 'URL',
      control: 'text',
      description: 'The URL the link points to, e.g. "https://www.linkedin.com/" or "mailto:test@test.fr".'
    },
  },
}

export default meta
type Story = StoryObj<typeof FooterLink>

export const WithLink: Story = {
  args: {
    name: 'LinkedIn',
    detail: 'Go to profile',
    url: 'https://www.linkedin.com/',
  },
}

export const WithActionLink: Story = {
  args: {
    name: 'Email',
    detail: 'Send an email',
    url: 'mailto:test@test.fr',
  },
}

export const WithoutLink: Story = {
  args: {
    name: 'Location',
    detail: '44300 Nantes, France',
  },
}