import { render, fireEvent, waitFor } from '@testing-library/react'

import Accordion, { type Slide } from './Accordion'

import styles from './Accordion.module.scss'

const mockDevice = (device: string): void => {
  vi.stubGlobal('navigator', { ...globalThis.window.navigator, userAgent: device })
}

const slide: Slide = {
  keywords: ['First keyword', 'Second keyword'],
  description: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien eget nunc accumsan finibus.'],
  cover: ['http://placehold.co/300x200'],
}

describe('Accordion (components)', () => {
  beforeEach(() => {
    vi.unstubAllGlobals()
  })

  it('properly renders the component', () => {
    const { getByLabelText } = render(<Accordion slides={[slide]} />)
    expect(getByLabelText('Accordion')).toBeInTheDocument()
  })

  it('renders the right amount of slides', () => {
    const { getAllByLabelText } = render(<Accordion slides={[slide, slide, slide, slide]} />)
    expect(getAllByLabelText("Accordion Slide")).toHaveLength(4)
  })

  it('renders the the right selected slide', () => {
    const { getAllByLabelText } = render(<Accordion slides={[slide, slide, slide, slide]} selected={2} />)

    expect(getAllByLabelText("Accordion Slide")[0]).not.toHaveClass(styles.selected)
    expect(getAllByLabelText("Accordion Slide")[2]).toHaveClass(styles.selected)
  })

  it('is accessible for desktop', () => {
    mockDevice('desktop')

    const { getByLabelText, getAllByLabelText } = render(<Accordion slides={[slide, slide]} selected={0} />)

    expect(getByLabelText('Accordion Navigation')).toHaveAttribute('aria-hidden')
    expect(getByLabelText('Switch to the #1 slide')).toHaveAttribute('tabindex', '-1')
    expect(getAllByLabelText('Accordion Slide')[0].querySelector('h5')).toHaveAttribute('tabindex', '0')
    expect(getAllByLabelText('Accordion Slide')[0].querySelector('div')).not.toHaveAttribute('aria-hidden')
    expect(getAllByLabelText('Accordion Slide')[1].querySelector('div')).toHaveAttribute('aria-hidden')
  })

  it('is accessible for mobile', () => {
    mockDevice('mobile')

    const { getByLabelText, getAllByLabelText } = render(<Accordion slides={[slide, slide]} selected={1} />)

    expect(getByLabelText('Accordion Navigation')).not.toHaveAttribute('aria-hidden')
    expect(getByLabelText('Switch to the #1 slide')).toHaveAttribute('tabindex', '0')
    expect(getAllByLabelText('Accordion Slide')[0].querySelector('h5')).toHaveAttribute('tabindex', '-1')
    expect(getAllByLabelText('Accordion Slide')[0].querySelector('div')).not.toHaveAttribute('aria-hidden')
    expect(getAllByLabelText('Accordion Slide')[0].querySelector('div')).not.toHaveAttribute('aria-hidden')
  })

  it('switches to the right slide on click', () => {
    const onSelectAction = vi.fn()
    const { getAllByLabelText } = render(<Accordion slides={[slide, slide, slide, slide]} selected={0} onSelect={onSelectAction} />)

    expect(getAllByLabelText("Accordion Slide")[0]).toHaveClass(styles.selected)

    fireEvent.click(getAllByLabelText("Accordion Slide")[1])

    waitFor(() => {
      expect(onSelectAction).toHaveBeenCalledWith(1)
      expect(getAllByLabelText("Accordion Slide")[0]).not.toHaveClass(styles.selected)
      expect(getAllByLabelText("Accordion Slide")[1]).toHaveClass(styles.selected)
    })
  })

  it('automatically switches to the next slide after x seconds', async () => {
    vi.useFakeTimers()

    const duration = 10
    const onSelectAction = vi.fn()

    const { getAllByLabelText } = render(
      <Accordion
        slides={[slide, slide, slide, slide]}
        selected={0}
        onSelect={onSelectAction}
        animationDuration={duration}
      />
    )

    expect(getAllByLabelText("Accordion Slide")[0]).toHaveClass(styles.selected)

    await vi.advanceTimersByTimeAsync(duration)

    waitFor(() => {
      expect(onSelectAction).toHaveBeenCalledWith(1)
      expect(getAllByLabelText("Accordion Slide")[0]).not.toHaveClass(styles.selected)
      expect(getAllByLabelText("Accordion Slide")[1]).toHaveClass(styles.selected)
    })
  })
})