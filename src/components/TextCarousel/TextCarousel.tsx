import { useState, useReducer, useEffect, useRef, useCallback, type FC } from 'react'
import classNames from 'classnames'

import { firstGoesLast, shuffleExceptFirst } from '@/utils/arrays'

import styles from './TextCarousel.module.scss'

type Props = {
  words: string[]
  textClassName?: string
}

type State = {
  list: string[]
  width?: number
}

type Action =
  | { type: 'setWidth', width?: number }
  | { type: 'shuffleWords', words: string[] }
  | { type: 'firstGoesLast' }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setWidth':
      return { ...state, width: action.width }
    case 'shuffleWords':
      return { ...state, list: shuffleExceptFirst(action.words) }
    case 'firstGoesLast':
      return { ...state, list: firstGoesLast(state.list) }
    default:
      return state
  }
}

export const INTERVAL = 2000

const TextCarousel: FC<Props> = ({ words, textClassName }) => {
  const [isAnimationOn, setIsAnimationOn] = useState<boolean>(false)
  const [{ width, list }, dispatch] = useReducer(reducer, { list: shuffleExceptFirst(words) })

  const itemsRef = useRef<(HTMLLIElement | null)[]>([])
  const setItemRef = useCallback((index: number, el: HTMLLIElement | null) => {
    itemsRef.current[index] = el
  }, [])

  const timer = useCallback(() => {
    setIsAnimationOn(true)
    dispatch({ type: 'setWidth', width: itemsRef.current[1]?.offsetWidth })

    setTimeout(() => {
      dispatch({ type: 'firstGoesLast' })
      setIsAnimationOn(false)
    }, INTERVAL - 500)
  }, [])

  useEffect(() => {
    dispatch({ type: 'shuffleWords', words })
  }, [words])

  useEffect(() => {
    dispatch({ type: 'setWidth', width: itemsRef.current[0]?.offsetWidth })
  }, [])

  useEffect(() => {
    const id = setInterval(timer, INTERVAL)
    return () => clearInterval(id)
  }, [timer])

  useEffect(() => {
    const handleSize = () => dispatch({ type: 'setWidth', width: itemsRef.current[0]?.offsetWidth })
    window.addEventListener('resize', handleSize)
    return () => window.removeEventListener('resize', handleSize)
  }, [])

  return (
    <ul className={styles.listContainer} style={{ width }} aria-label="Text Carousel">
      {list.map((el, i) =>
        <li
          className={classNames(styles.listItem, textClassName, { [styles.animate]: isAnimationOn })}
          ref={(el) => setItemRef(i, el)}
          key={i}
        >
          {el}
        </li>
      )}
    </ul>
  )
}

export default TextCarousel