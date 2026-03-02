import type { Meta, StoryObj } from '@storybook/react-vite'
import type { DecoratorFunction } from 'storybook/internal/csf'

import Tooltip from './Tooltip'

const StoryWithAdditionalPadding: DecoratorFunction = (StoryElement) => <div style={{ margin: '5em' }}><StoryElement /></div>

const meta = {
  title: 'UI/Tooltip',
  component: Tooltip,
  argTypes: {
    text: {
      name: 'Text',
      control: 'text',
      description: 'Text to display in the tooltip',
    },
    children: {
      name: 'Children',
      description: 'Element to trigger the tooltip on hover. If not provided, a question mark will be used as trigger.',
    },
    containerClassName: {
      name: 'ContainerClassName',
      control: 'text',
      description: 'ClassName to apply additional styles on the container of the tooltip',
    },
    questionMarkClassName: {
      name: 'QuestionMarkClassName',
      control: 'text',
      description: 'ClassName to apply additional styles on the question mark element of the tooltip',
    },
    infoBoxClassName: {
      name: 'InfoBoxClassName',
      control: 'text',
      description: 'ClassName to apply additional styles on the info box element of the tooltip',
    },
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const WithQuestionMark: Story = {
  args: {
    text: 'This is a tooltip',
  },
  decorators: [StoryWithAdditionalPadding],
}

export const WithCustomChildren: Story = {
  args: {
    text: 'This is a tooltip',
    children: <button>Hover me</button>,
  },
  decorators: [StoryWithAdditionalPadding],
}