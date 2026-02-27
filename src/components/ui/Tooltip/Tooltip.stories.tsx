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

export const Default: Story = {
  args: {
    text: 'This is a tooltip',
  },
  decorators: [StoryWithAdditionalPadding],
}