import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'

import { selectionToIndex, type SelectionItem } from '@/components'

import Accordion from './Accordion'

const meta = {
  title: 'General/Accordion',
  component: Accordion,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    slides: {
      name: 'Slides',
      control: 'object',
      description: "Array of slides to display in the accordion, each slide should have a keywords array, a description array and a cover array",
    },
    selected: {
      name: 'Selected',
      control: 'number',
      description: "Index of the currently selected slide, it will be highlighted and its description will be displayed",
    },
    onSelect: {
      name: 'onSelect',
      action: 'selected',
      description: "Function to call when a slide is selected, it receives the index of the selected slide as an argument",
    },
    animationDuration: {
      name: 'Animation Duration',
      control: 'number',
      description: "Duration of the of the progress bar animation in seconds, it will switch to the next slide once the animation is complete",
    },
  },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Regular: Story = {
  args: {
    slides: [
      {
        keywords: ['First keyword', 'Second keyword'],
        description: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien eget nunc accumsan finibus.'],
        cover: ['http://placehold.co/300x200'],
      },
      {
        keywords: ['First keyword', 'Second keyword'],
        description: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien eget nunc accumsan finibus.'],
        cover: ['http://placehold.co/300x200'],
      },
      {
        keywords: ['First keyword', 'Second keyword'],
        description: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien eget nunc accumsan finibus.'],
        cover: ['http://placehold.co/300x200'],
      },
    ],
    selected: 0,
    animationDuration: 10,
  },
  render: (args) => {
    const [{ selected }, updateArgs] = useArgs();
 
    const onSelect = (n: SelectionItem) => {
      updateArgs({ selected: selectionToIndex(n, selected || 0, args.slides.length) });
    }

    return <Accordion {...args} selected={selected} onSelect={onSelect} />;
  },
}