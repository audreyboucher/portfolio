import { useState, useEffect, useRef, type FC, type RefObject } from 'react'
import classNames from 'classnames'

import { firstGoesLast, shuffleExceptFirst } from '@/utils/arrays'

import styles from './TextCarousel.module.scss'

type Props = {
  words: string[]
  textClassName?: string
}

export const INTERVAL = 2000

const TextCarousel: FC<Props> = ({ words, textClassName }) => {
  const [list, setList] = useState<string[]>([])
  const [isAnimationOn, setIsAnimationOn] = useState<boolean>(false)
  const [width, setWidth] = useState<number>()

  const items: RefObject<HTMLLIElement | null>[] = [useRef(null), useRef(null)]

  const timer = () => {
    setIsAnimationOn(true)
    setWidth(items[1].current?.offsetWidth)

    setTimeout(() => {
      setList(firstGoesLast(list))
      setIsAnimationOn(false)
    }, INTERVAL - 500)
  }

  useEffect(() => {
    setList(shuffleExceptFirst(words))
  }, [words])

  useEffect(() => {
    setWidth(items[0].current?.offsetWidth)
  }, [list])

  useEffect(() => {
    const id = setInterval(timer, INTERVAL)
    return () => clearInterval(id)
  })

  useEffect(() => {
    const handleSize = () => setWidth(items[0].current?.offsetWidth)
    window.addEventListener('resize', handleSize)
    return () => window.removeEventListener('resize', handleSize)
  }, [])

  return (
    <ul className={styles.listContainer} style={{ width }} aria-label="Text Carousel">
      {list.map((el, i) =>
        <li
          className={classNames(styles.listItem, textClassName, { [styles.animate]: isAnimationOn })}
          ref={i < items.length ? items[i] : null}
          key={i}
        >
          {el}
        </li>
      )}
    </ul>
  )
}

export default TextCarousel