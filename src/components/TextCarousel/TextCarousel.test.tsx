import { render, waitFor } from '@testing-library/react'

import TextCarousel, { INTERVAL } from './TextCarousel'

describe('TextCarousel (components)', () => {
  it('properly renders the component', () => {
    const { getByLabelText } = render(<TextCarousel words={['Hello', 'World']} />)
    expect(getByLabelText('Text Carrousel')).toBeInTheDocument()
  })

  it('shuffles the words except the first one', async () => {
    const words = ['Hello', 'World', 'This', 'Is', 'A', 'Test']
    const { getByLabelText, getByText } = render(<TextCarousel words={words} />)
    const carrouselWords = Array.from(getByLabelText('Text Carrousel').childNodes).map((node) => node.textContent)

    let shuffledWords = 0

    expect(getByLabelText('Text Carrousel').childNodes[0]).toHaveTextContent(words[0])

    for await (const [index, word] of words.entries()) {
      expect(getByText(word)).toBeInTheDocument()
      if (index !== carrouselWords.indexOf(word)) shuffledWords++
    }

    expect(shuffledWords).toBeGreaterThan(0)
  })

  it('changes the first word on a regular interval', async () => {
    vi.useFakeTimers()

    const words = ['Hello', 'World', 'This', 'Is', 'A', 'Test']
    const { getByLabelText } = render(<TextCarousel words={words} />)

    expect(getByLabelText('Text Carrousel').childNodes[0]).toHaveTextContent(words[0])

    const secondWord = getByLabelText('Text Carrousel').childNodes[1].textContent!

    await vi.advanceTimersByTimeAsync(INTERVAL)

    waitFor(() => {
      expect(getByLabelText('Text Carrousel').childNodes[0]).toHaveTextContent(secondWord)
    })
  })

  it('adapts the width of the container to the current word', async () => {
    vi.useFakeTimers()

    const words = ['Hi', 'World']
    const { getByLabelText, getByText } = render(<TextCarousel words={words} />)

    expect(getByLabelText('Text Carrousel')).toHaveStyle(`width: ${getByText(words[0]).offsetWidth}px`)

    await vi.advanceTimersByTimeAsync(INTERVAL)

    waitFor(() => {
      expect(getByLabelText('Text Carrousel')).toHaveStyle(`width: ${getByText(words[1]).offsetWidth}px`)
    })
  })

  it('adapts the width of the container on window resize', async () => {
    const words = ['Hi', 'World']
    const { getByLabelText, getByText } = render(<TextCarousel words={words} />)
    const originalWidth = getByText(words[0]).offsetWidth

    expect(getByLabelText('Text Carrousel')).toHaveStyle(`width: ${originalWidth}px`)

    window.innerWidth = 500

    waitFor(() => {
      expect(getByLabelText('Text Carrousel')).toHaveStyle(`width: ${getByText(words[0]).offsetWidth}px`)
      expect(getByText(words[0]).offsetWidth).not.toBe(originalWidth)
    })
  })
})