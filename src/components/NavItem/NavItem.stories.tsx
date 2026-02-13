import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { DecoratorFunction } from 'storybook/internal/csf'

import NavItem from './NavItem'

const StoryWithAdditionalPadding = (n: number = 0): DecoratorFunction => (StoryElement) => <div style={{ marginBottom: `${n * 3}em` }}><StoryElement /></div>

const meta = {
  title: 'General/NavItem',
  component: NavItem,
  argTypes: {
    name: {
      name: 'Name',
      control: 'text',
      description: "Name of the item or subitem",
    },
    anchor: {
      name: 'Anchor',
      control: 'text',
      description: "Name of the anchor the page will scroll to on click on the item or subitem",
    },
    disabled: {
      name: 'Disabled',
      control: 'boolean',
      description: "Prevents click and add a 'Coming soon' tag",
      default: false,
    },
    onClick: {
      name: 'OnClick',
      description: "Event triggered on click on the button (when no anchor)",
      default: fn(),
    },
    subMenu: {
      name: "SubMenu",
      description: "Array of NavItems (with all associated props) that will be displayed on hover the main item",
      table: {
        type: { summary: 'Item[]' },
      },
      default: undefined,
    },
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
} satisfies Meta<typeof NavItem>

export default meta
type Story = StoryObj<typeof meta>

export const Regular: Story = {
  args: {
    name: 'Nav item',
  },
}

export const Disabled: Story = {
  args: {
    name: 'Nav item',
    disabled: true,
  },
}

const subMenus = [
  { name: 'Sub item', },
  { name: 'Disabled sub item', disabled: true, },
  { name: 'Longer sub item', },
  { name: 'Sub item', },
]

export const WithSubMenu: Story = {
  args: {
    name: 'Nav item',
    subMenu: subMenus,
  },
  decorators: [StoryWithAdditionalPadding(subMenus.length)],
}