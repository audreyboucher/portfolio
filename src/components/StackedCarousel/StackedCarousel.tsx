import { useEffect, useReducer, type FC } from 'react'
import classNames from 'classnames'

import type { SelectionItem } from '@/components'

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

type State = {
  order: number[]
  isAnimationOn: boolean
  selected: number
}

type Action =
  | { type: 'select'; index: number }
  | { type: 'animationEnd' }

const getSelectionIndex = (imagesList: number[], current: number): number =>
  imagesList.findLastIndex((index) => index === current)

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'select': {
      if (action.index === state.selected) return state

      const base = state.order
      const index = getSelectionIndex(base, action.index)
      const newOrder = index === -1 ? base : [...base, ...base.slice(0, index)]

      return { order: newOrder, isAnimationOn: true, selected: action.index }
    }
    case 'animationEnd': {
      const index = getSelectionIndex(state.order, state.selected)

      if (index <= 0) return { ...state, isAnimationOn: false }
      return { ...state, order: state.order.slice(index), isAnimationOn: false }
    }
    default:
      return state
  }
}

const ImageCarousel: FC<Props> = ({
  images,
  selected = 0,
  onSelect = () => {},
  animationDuration = 1,
  containerClassName,
}) => {
  const initialState: State = {
    order: images.map(({ index }) => index),
    isAnimationOn: false,
    selected,
  }

  const [{ order, isAnimationOn, selected: nextSelection }, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (selected === nextSelection) return
    dispatch({ type: 'animationEnd' })
    dispatch({ type: 'select', index: selected })
    onSelect(selected)
  }, [selected, nextSelection, onSelect])

  useEffect(() => {
    if (!isAnimationOn) return
    const id = setTimeout(() => dispatch({ type: 'animationEnd' }), animationDuration * 1000)
    return () => clearTimeout(id)
  }, [isAnimationOn, animationDuration])

  return (
    <ul className={classNames(styles.container, { [styles.animate]: isAnimationOn }, containerClassName)} aria-label="Carousel">
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
              aria-label={`Carousel #${index + 1} Slide`}
              tabIndex={0}
            >
              <figure>
                {path.map((image, imageIndex) =>
                  <img key={`image${index}-${i}-${imageIndex}`} src={image} alt={alt} />
                )}
              </figure>
            </li>
          ))
      }
    </ul>
  )
}

export default ImageCarousel