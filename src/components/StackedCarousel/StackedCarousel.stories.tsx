import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'

import { selectionToIndex, type SelectionItem } from '@/components'

import StackedCarousel from './StackedCarousel'

const meta = {
  title: 'General/StackedCarousel',
  component: StackedCarousel,
  argTypes: {
    images: {
      name: 'Images',
      control: 'object',
      description: 'Array of images to display in the carousel, along with their index and alt message',
    },
    selected: {
      name: 'Selected',
      control: 'number',
      description: 'Index of the currently selected slide, it will be highlighted and its description will be displayed',
    },
    onSelect: {
      name: 'onSelect',
      action: 'selected',
      description: 'Function to call when a slide is selected, it receives the index of the selected slide as an argument',
    },
    animationDuration: {
      name: 'Animation Duration',
      control: 'number',
      description: 'Duration of the of the progress bar animation in seconds, it will switch to the next slide once the animation is complete',
    },
  },
} satisfies Meta<typeof StackedCarousel>

export default meta
type Story = StoryObj<typeof meta>

export const Regular: Story = {
  args: {
    images: [
      {
        index: 0,
        path: ['http://placehold.co/325x450'],
        alt: 'Image',
      },
      {
        index: 1,
        path: ['http://placehold.co/325x450'],
        alt: 'Image',
      },
      {
        index: 2,
        path: ['http://placehold.co/325x450'],
        alt: 'Image',
      },
    ],
    selected: 0,
    animationDuration: 10,
  },
  render: (args) => {
    const [{ selected }, updateArgs] = useArgs()
 
    const onSelect = (n: SelectionItem) => {
      updateArgs({ selected: selectionToIndex(n, selected as number || 0, args.images.length) })
    }

    return <StackedCarousel {...args} selected={selected as number} onSelect={onSelect} />
  },
}