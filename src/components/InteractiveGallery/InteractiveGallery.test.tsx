import { fireEvent, render, waitFor } from '@testing-library/react'

import type { AccordionSlide } from '@/components'

import InteractiveGallery from './InteractiveGallery'

import styles from '@/components/Accordion/Accordion.module.scss'

const slide: AccordionSlide = {
  keywords: ['First keyword', 'Second keyword'],
  description: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien eget nunc accumsan finibus.'],
  cover: ['http://placehold.co/300x200'],
}

describe('InteractiveGallery (components)', () => {
  it('properly renders the component', () => {
    const { getByLabelText } = render(<InteractiveGallery title="Title" slides={[slide, slide, slide]} />)

    expect(getByLabelText('Carousel')).toBeInTheDocument()
    expect(getByLabelText('Accordion')).toBeInTheDocument()
  })

  it('prints the title', () => {
    const { getByText } = render(<InteractiveGallery title="Title" slides={[slide, slide, slide]} />)
    expect(getByText('Title')).toBeInTheDocument()
  })

  describe('coordinated child components', () => {
    it('selects the same slide in both the carousel and accordion', () => {
      const { getByLabelText, getAllByLabelText } = render(<InteractiveGallery title="Title" slides={[slide, slide, slide]} />)

      expect(getByLabelText('Carousel').childNodes[0]).toHaveAttribute('aria-label', 'Carousel #1 Slide')
      expect(getAllByLabelText('Accordion Slide')[0]).toHaveClass(styles.selected)
    })

    it('switches them both on click on a carousel slide', () => {
      const { getByLabelText, getAllByLabelText } = render(<InteractiveGallery title="Title" slides={[slide, slide, slide]} />)

      fireEvent.click(getByLabelText('Carousel').childNodes[1])

      waitFor(() => {
        expect(getByLabelText('Carousel').childNodes[0]).toHaveAttribute('aria-label', 'Carousel #2 Slide')
        expect(getAllByLabelText('Accordion Slide')[1]).toHaveClass(styles.selected)
      })
    })

    it('switches them both on click on an accordion slide', () => {
      const { getByLabelText, getAllByLabelText } = render(<InteractiveGallery title="Title" slides={[slide, slide, slide]} />)

      fireEvent.click(getAllByLabelText('Accordion Slide')[1])

      waitFor(() => {
        expect(getByLabelText('Carousel').childNodes[0]).toHaveAttribute('aria-label', 'Carousel #2 Slide')
        expect(getAllByLabelText('Accordion Slide')[1]).toHaveClass(styles.selected)
      })
    })
  })

  describe('automatic loop', () => {
    it('automatically switches to the next slide after x seconds', async () => {
      vi.useFakeTimers()

      const duration = 10
      const { getByLabelText, getAllByLabelText } = render(<InteractiveGallery title="Title" slides={[slide, slide, slide]} interval={duration} />)

      await vi.advanceTimersByTimeAsync(duration * 1000)

      waitFor(() => {
        expect(getByLabelText('Carousel').childNodes[0]).toHaveAttribute('aria-label', 'Carousel #2 Slide')
        expect(getAllByLabelText('Accordion Slide')[1]).toHaveClass(styles.selected)
      })
    })

    it('resets the timer after click on a carousel image', async () => {
      vi.useFakeTimers()

      const duration = 10
      const { getByLabelText, getAllByLabelText } = render(<InteractiveGallery title="Title" slides={[slide, slide, slide]} interval={duration} />)

      await vi.advanceTimersByTimeAsync(2000)

      fireEvent.click(getByLabelText('Carousel').childNodes[1])

      await vi.advanceTimersByTimeAsync(duration * 1000)

      waitFor(() => {
        expect(getByLabelText('Carousel').childNodes[0]).toHaveAttribute('aria-label', 'Carousel #3 Slide')
        expect(getAllByLabelText('Accordion Slide')[2]).toHaveClass(styles.selected)
      })
    })

    it('resets the timer after click on a accordion item', async () => {
      vi.useFakeTimers()

      const duration = 10
      const { getByLabelText, getAllByLabelText } = render(<InteractiveGallery title="Title" slides={[slide, slide, slide]} interval={duration} />)

      await vi.advanceTimersByTimeAsync(2000)

      fireEvent.click(getAllByLabelText('Accordion Slide')[1])

      await vi.advanceTimersByTimeAsync(duration * 1000)

      waitFor(() => {
        expect(getByLabelText('Carousel').childNodes[0]).toHaveAttribute('aria-label', 'Carousel #3 Slide')
        expect(getAllByLabelText('Accordion Slide')[2]).toHaveClass(styles.selected)
      })
    })
  })
})