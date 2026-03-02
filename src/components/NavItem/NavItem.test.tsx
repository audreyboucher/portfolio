import { render, fireEvent, waitFor } from '@testing-library/react'

import * as scrollUtils from '@/utils/scroll'

import NavItem from './NavItem'

vi.mock('@/utils/scroll')

describe('NavItem (components)', () => {
  describe('with an anchor', () => {
    it('renders the component properly', () => {
      const { getByLabelText, getByText } = render(<NavItem name="test" />)

      expect(getByLabelText('Nav item')).toBeInTheDocument()
      expect(getByText('test')).toBeInTheDocument()
    })

    it('is accessible', () => {
      const { getByLabelText } = render(<NavItem name="test" />)
      expect(getByLabelText('Nav item')).toHaveAttribute('tabindex', '0')
    })

    it('scrolls to the anchor on click on the nav item', () => {
      const { getByLabelText } = render(
        <>
          <NavItem name="test" anchor="test" />
          <div id="test" />
        </>
      )

      const scrollToAnchor = vi.spyOn(scrollUtils, 'scrollToAnchor')

      fireEvent.click(getByLabelText('Nav item'))

      waitFor(() => {
        expect(scrollToAnchor).toHaveBeenCalledWith('test')
      })
    })
  })

  describe('with a submenu', () => {
    it('renders the component properly', () => {
      const { getByLabelText, getByText } = render(<NavItem name="test" subMenu={[ { name: 'submenu' } ]} />)

      expect(getByLabelText('Nav item')).toBeInTheDocument()
      expect(getByText('test')).toBeInTheDocument()
      expect(getByText('submenu')).toBeInTheDocument()
    })

    it('is accessible', () => {
      const { getByLabelText } = render(<NavItem name="test" subMenu={[ { name: 'submenu' } ]} />)

      expect(getByLabelText('Nav item')).toHaveAttribute('tabindex', '0')
      expect(getByLabelText('Sub nav item')).toHaveAttribute('tabindex', '0')
    })

    it('contains all sub items', () => {
      const { getAllByLabelText } = render(<NavItem name="test" subMenu={[ { name: '1' }, { name: '2' }, { name: '3' }, { name: '4' } ]} />)

      expect(getAllByLabelText('Sub nav item')).toHaveLength(4)
    })

    it('scrolls to the anchor on click on a sub item', () => {
      const { getByLabelText } = render(
        <>
          <NavItem name="test" anchor="test" subMenu={[ { name: 'submenu', anchor: 'submenu' } ]} />
          <div id="submenu" />
        </>
      )

      const scrollToAnchor = vi.spyOn(scrollUtils, 'scrollToAnchor')

      fireEvent.click(getByLabelText('Nav item'))

      waitFor(() => {
        expect(scrollToAnchor).toHaveBeenCalledWith('submenu')
      })
    })
  })

  describe('disabled state', () => {
    it('renders the component properly', () => {
      const { getByLabelText, getByText } = render(<NavItem name="test" disabled />)

      expect(getByLabelText('Nav item')).toBeInTheDocument()
      expect(getByLabelText('Nav item')).toHaveAttribute('aria-disabled', 'true')
      expect(getByText('test')).toBeInTheDocument()
    })
  
    it('is excluded from the keyboard navigation', () => {
      const { getByLabelText } = render(<NavItem name="test" disabled />)
      expect(getByLabelText('Nav item')).toHaveAttribute('tabindex', '-1')
    })

    it('contains a "Coming soon" tag', () => {
      const { getByLabelText } = render(<NavItem name="test" disabled />)
      expect(getByLabelText('Nav item')).toHaveTextContent('Coming soon')
    })
  })
})