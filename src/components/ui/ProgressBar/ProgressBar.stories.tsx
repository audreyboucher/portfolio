import type { Meta, StoryObj } from '@storybook/react-vite'

import ProgressBar, { ProgressBarType } from './ProgressBar'

const meta = {
  title: 'UI/ProgressBar',
  component: ProgressBar,
  argTypes: {
    type: {
      name: 'Type',
      control: 'select',
      options: Object.values(ProgressBarType),
      description: "Type of the progress bar, either a line or a circle",
      default: ProgressBarType.Line,
    },
    value: {
      name: 'Value',
      control: 'number',
      description: "Value of the progress bar, between 0 and 100",
    },
    color: {
      name: 'Color',
      control: 'color',
      description: "Color of the progress bar",
    },
    animationDuration: {
      name: 'AnimationDuration',
      control: 'number',
      description: "Duration of the animation in seconds",
    },
    className: {
      name: 'ClassName',
      control: 'text',
      description: "ClassName to apply additional styles on the progress bar",
    },
    launchAnimation: {
      name: 'LaunchAnimation',
      control: 'boolean',
      description: "Whether the animation should be launched on mount (only for circle type)",
    },
    children: {
      name: 'Children',
      description: "Content to display in the center of the circle (only for circle type)",
    },
    containerClassName: {
      name: 'ContainerClassName',
      control: 'text',
      description: "ClassName to apply additional styles on the container of the progress bar (only for circle type)",
    },
  },
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Line: Story = {
  args: {
    type: ProgressBarType.Line,
    value: 75,
    animationDuration: 1,
  },
}

export const Circle: Story = {
  args: {
    type: ProgressBarType.Circle,
    value: 75,
    animationDuration: 1,
    launchAnimation: true,
    children: <span>75%</span>,
  },
}