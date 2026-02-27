import type { Meta, StoryObj } from '@storybook/react-vite'

import Skill, { type SkillType } from './Skill'

const meta = {
  title: 'General/Skill',
  component: Skill,
  argTypes: {
    name: {
      name: 'Name',
      control: 'select',
      options: ['HTML', 'CSS', 'SASS', 'Javascript', 'React', 'Vue', 'Django', 'Cypress', 'Figma', 'Photoshop', 'Illustrator', 'Xd', 'GitHub', 'GitLab', 'PostgreSQL', 'Jira'],
      description: 'Name of the skill, also used to determine the color and icon to use',
    },
    value: {
      name: 'Value',
      control: 'number',
      description: 'Value of the skill, should be between 0 and 100',
    },
    info: {
      name: 'Info',
      control: 'text',
      description: 'Additional info about the skill to display in a tooltip',
    },
    launchAnimation: {
      name: 'LaunchAnimation',
      control: 'boolean',
      description: 'Whether to launch the animation or not, should be set to true when the skill is visible on the screen',
    },
  },
} satisfies Meta<typeof Skill>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'React',
    value: 80,
    info: 'I have been using it for 3 years and have built several projects with it, including this portfolio',
    launchAnimation: true,
  } as SkillType,
}