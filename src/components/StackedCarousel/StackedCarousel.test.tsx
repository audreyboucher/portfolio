import { fireEvent, render, waitFor } from '@testing-library/react'

import StackedCarousel, { type Image } from './StackedCarousel'

const image: Image = {
  index: 0,
  cover: ['http://placehold.co/325x450'],
  keywords: ['Image', 'slide'],
}

const images: Image[] = [image, image, image].map((image, index) => ({ ...image, index }))

describe('StackedCarousel (components)', () => {
  it('properly renders the component', () => {
    const { getByLabelText } = render(<StackedCarousel images={images} />)
    expect(getByLabelText('Carousel')).toBeInTheDocument()
  })

  it('renders the selected image as the first one', () => {
    const { getByLabelText } = render(<StackedCarousel images={images} selected={1} />)

    waitFor(() => {
      expect(getByLabelText('Carousel').childNodes[0]).toHaveAttribute('aria-label', 'Carousel #2 Slide')
    })
  })

  it('switches to another image', () => {
    const SelectAction = vi.fn()
    const { getByLabelText } = render(<StackedCarousel images={images} selected={0} onSelect={SelectAction} />)

    fireEvent.click(getByLabelText('Carousel').childNodes[1])

    expect(SelectAction).toHaveBeenCalledWith(1)
  })
})