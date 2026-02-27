import { fireEvent, render } from '@testing-library/react'

import Loader from './Loader'

describe('Loader (components/ui)', () => {
  let mockReadyState: DocumentReadyState = 'loading'

  beforeAll(() => {
    Object.defineProperty(document, 'readyState', {
      get() { return mockReadyState },
    })
  })

  describe('loading state', () => {
    beforeEach(() => {
      mockReadyState = 'loading'
    })

    it('renders the component properly', () => {
      const { container, getByText } = render(<Loader />)

      expect(container).not.toBeEmptyDOMElement()
      expect(getByText('Loading')).toBeInTheDocument()
    })

    it('prevents the user from scrolling in the page', () => {
      render(<Loader />);
      expect(global.document.documentElement).toHaveAttribute('style', 'overflow: hidden;')
    })
  })

  describe('complete state', () => {
    beforeEach(() => {
      mockReadyState = 'complete'
    })

    it('does not render the loader', () => {
      const { container } = render(<Loader />)
      expect(container).toBeEmptyDOMElement()
    })

    it('allows the user to scroll again when the page is loaded', () => {
      render(<Loader />)
      expect(global.document.documentElement).toHaveAttribute('style', 'overflow: auto;')
    })
  })

  describe('from loading to complete state', () => {
    beforeEach(() => {
      mockReadyState = 'loading'
    })

    it('waits for the page to load', () => {
      const { container } = render(<Loader />)

      expect(container).not.toBeEmptyDOMElement();
      expect(global.document.documentElement).toHaveAttribute('style', 'overflow: hidden;')

      fireEvent(global.window, new Event('load'))

      expect(container).toBeEmptyDOMElement()
      expect(global.document.documentElement).toHaveAttribute('style', 'overflow: auto;')
    })
  })
})