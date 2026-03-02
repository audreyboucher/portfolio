import { useRef, type ReactElement } from 'react'
import { useValue, animate as Animate } from 'react-ui-animate'
import classNames from 'classnames'

import styles from './Tooltip.module.scss'

type Props = {
  text: string
  children?: ReactElement
  containerClassName?: string
  questionMarkClassName?: string
  infoBoxClassName?: string
};

const Tooltip = ({ text, children, containerClassName, questionMarkClassName, infoBoxClassName }: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  const [x, setX] = useValue(0)
  const [y, setY] = useValue(0)

  const getPosition = (axis: 'top' | 'left'): number => ref?.current?.getBoundingClientRect()[axis] || 0

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setX(e.clientX - getPosition('left'))
    setY(e.clientY - getPosition('top'))
  }

  return (
    <div className={classNames(styles.container, containerClassName)}>
      <div
        className={styles.mouseOverZone}
        ref={ref}
        onMouseMove={handleMouseMove}
        aria-describedby='tooltip'
        tabIndex={0}
      >
        {children || <span className={classNames(styles.questionMark, questionMarkClassName)}>?</span>}
      </div>

      <Animate.div
        className={classNames(styles.infoBox, infoBoxClassName)}
        style={{ translateX: x, translateY: y }}
        role='tooltip'
      >
        {text}
      </Animate.div>
    </div>
  )
}

export default Tooltip