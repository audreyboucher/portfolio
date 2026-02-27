import { useEffect, useState, type FC } from 'react'
import classNames from 'classnames'

import { StackedCarousel, type CarouselImage, Accordion, type AccordionSlide } from '@/components'
import { ANIMATION_DURATION } from '@/components/ui'

import styles from './InteractiveGallery.module.scss'

type Props = {
  title: string
  slides: AccordionSlide[]
  interval?: number // in seconds
}

export type SelectionItem = number | 'next' | 'previous'

export const selectionToIndex = (selection: SelectionItem, currentIndex: number, length: number): number => {
  if (selection === 'next') return currentIndex === length - 1 ? 0 : currentIndex + 1
  else if (selection === 'previous') return currentIndex === 0 ? length - 1 : currentIndex - 1
  return selection
}

const InteractiveGallery: FC<Props> = ({ title, slides, interval = ANIMATION_DURATION }) => {
  const [selectedItem, setSelectedItem] = useState<number>(0)

  const parseImages = (slidesList: AccordionSlide[]): CarouselImage[] =>
    slidesList.map(({ cover, keywords }, index) => ({
      path: cover,
      alt: keywords.join(' & '),
      index,
    }))

  useEffect(() => {
    const id = setTimeout(() => {
      setSelectedItem(selectionToIndex('next', selectedItem, slides.length))
    }, interval * 1000)

    return () => clearTimeout(id)
  }, [selectedItem, interval, slides.length])

  const props = {
    selected: selectedItem,
    onSelect: (n: SelectionItem) => setSelectedItem(selectionToIndex(n, selectedItem, slides.length)),
  }

  return (
    <>
      <aside className={classNames(styles.carouselContainer, styles.desktopOnly)}>
        <StackedCarousel images={parseImages(slides)} {...props} />
      </aside>

      <article className={styles.textContainer}>
        <h4 className={styles.title}>{title}</h4>
        <Accordion slides={slides} animationDuration={interval} {...props} />
      </article>
    </>
  )
}

export default InteractiveGallery