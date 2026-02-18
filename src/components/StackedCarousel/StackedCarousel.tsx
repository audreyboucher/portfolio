import { useState, useEffect, type FC } from 'react'
import classNames from 'classnames'

import type { SelectionItem } from '@/components'
import { ANIMATION_DURATION } from '@/components/ui'

import styles from './StackedCarousel.module.scss'

export type Image = {
  index: number
  path: string[]
  alt: string
}

type Props = {
  images: Image[]
  selected?: number
  onSelect?: (index: SelectionItem) => void
  animationDuration?: number // in seconds
  containerClassName?: string
}

const ImageCarousel: FC<Props> = ({
  images,
  selected = 0,
  onSelect = () => {},
  animationDuration = ANIMATION_DURATION,
  containerClassName,
}) => {
  const [isAnimationOn, setIsAnimationOn] = useState<boolean>(false)
  const [order, setOrder] = useState<number[]>(images.map(({ index }) => index))
  const [nextSelection, setNextSelection] = useState<number>(selected)

  const getSelectionIndex = (imagesList: number[], current: number): number =>
    imagesList.findLastIndex((index) => index === current)

  useEffect(() => {
    if (selected === nextSelection) return

    setIsAnimationOn(true)
    onSelect(selected)
    setNextSelection(selected)
    setOrder((tmp) => [...tmp, ...tmp.slice(0, getSelectionIndex(tmp, selected))])

    const id = setTimeout(() => {
      setOrder((tmp) => {
        const index = getSelectionIndex(tmp, selected)
        return index ? tmp.slice(index) : tmp
      })
      onSelect('next')
      setIsAnimationOn(false)
    }, animationDuration * 1000)

    return () => clearTimeout(id)
  }, [selected])

  return (
    <ul className={classNames(styles.container, { [styles.animate]: isAnimationOn }, containerClassName)}>
      {
        order
          .map((i) => images.find(({ index }) => index === i)!)
          .map(({ alt, path, index }, i) => (
            <li
              key={`listItem${index}-${i}`}
              className={styles.listItem}
              onClick={() => onSelect(index)}
              onKeyUp={({ key }) => { if ([' ', 'Enter'].includes(key)) onSelect(index) }}
              attr-position={i - getSelectionIndex(order, nextSelection)}
              attr-duplicate={i !== order.findIndex((tmp) => tmp === index) ? 1 : 0}
              tabIndex={0}
            >
              <figure>
                {path.map((image, imageIndex) =>
                  <img key={`image${index}-${i}-${imageIndex}`} src={image} alt={alt} />)
                }
              </figure>
            </li>
          ))
      }
    </ul>
  )
}

export default ImageCarousel