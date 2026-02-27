import { useEffect, useReducer, useRef, type FC } from 'react'
import classNames from 'classnames'

import type { SelectionItem } from '@/components'
import { ProgressBar, ANIMATION_DURATION } from '@/components/ui'
import useSwipe from '@/hooks/useSwipe'
import useIsMobile from '@/hooks/useIsMobile'

import styles from './Accordion.module.scss'

export type Slide = {
  keywords: string[]
  description: string[]
  cover: string[]
  className?: string
}

type Props = {
  slides: Slide[]
  selected?: number
  onSelect?: (n: SelectionItem) => void
  animationDuration?: number // in seconds
}

type State = {
  progress: number
  height?: number
}

type Action =
  | { type: 'start' }
  | { type: 'end' }
  | { type: 'setHeight', height?: number }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'start':
      return { ...state, progress: 100 }
    case 'end':
      return { ...state, progress: 0 }
    case 'setHeight':
      return { ...state, height: action.height }
    default:
      return state
  }
}

const Accordion: FC<Props> = ({
  slides,
  selected = 0,
  onSelect = () => {},
  animationDuration = ANIMATION_DURATION
}) => {
  const [{ progress, height }, dispatch] = useReducer(reducer, { progress: 0 })
  const { isMobile } = useIsMobile()
  const mobileContainer = useRef<HTMLUListElement>(null)

  const swipeHandlers = useSwipe({
    onSwipedLeft: () => onSelect('next'),
    onSwipedRight: () => onSelect('previous'),
  })

  useEffect(() => {
    dispatch({ type: 'end' })
    setTimeout(() => dispatch({ type: 'start' }), 50)
  }, [selected])

  useEffect(() => dispatch({ type: 'start' }), [])

  useEffect(() => {
    const handleSize = () => {
      dispatch({
        type: 'setHeight',
        height: Math.max(...Array.from(mobileContainer.current?.childNodes || [])
          .map((el) => (el as HTMLElement).offsetHeight))
      })
    }

    window.addEventListener('resize', handleSize)
    return () => window.removeEventListener('resize', handleSize)
  }, [])

  return (
    <>
      <ProgressBar value={progress} animationDuration={animationDuration} className={styles.desktopOnly} aria-hidden />

      <ul className={classNames(styles.dots, styles.mobileOnly)} aria-label="Accordion Navigation" {...(!isMobile ? { 'aria-hidden': true } : {})}>
        {
          slides.map((_, index) =>
            <li
              className={classNames(styles.dot, { [styles.selected]: index === selected })}
              tabIndex={isMobile ? 0 : -1}
              key={index}
              onClick={() => onSelect(index)}
              aria-label={`Switch to the #${index + 1} slide`}
            ></li>
          )
        }
      </ul>

      <ul {...swipeHandlers} ref={mobileContainer} className={styles.textContainer} aria-label="Accordion" style={{ minHeight: height }}>
        {slides.map(({ keywords, description, cover, className }: Slide, index) => (
          <li
            className={classNames(styles.text, className, { [styles.selected]: index === selected })}
            key={index}
            onClick={() => onSelect(index)}
            aria-label="Accordion Slide"
          >
            <figure className={styles.mobileOnly}>
              <img src={cover[0]} alt={keywords.join(' & ')} />
            </figure>

            <h5
              tabIndex={isMobile ? -1 : 0}
              onKeyUp={({ key }) => { if ([' ', 'Enter'].includes(key)) onSelect(index) }}
            >
              {keywords.map((keyword, i) => <span key={i}>{keyword}</span>)}
            </h5>

            <div {...(!isMobile && index !== selected ? { 'aria-hidden': true } : {})}>
              {description.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Accordion