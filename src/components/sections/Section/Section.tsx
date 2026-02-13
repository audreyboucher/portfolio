import type { FC, ReactElement } from 'react'
import classNames from 'classnames'

import styles from './Section.module.scss'

type Props = {
  anchor: string
  background?: 'primary' | 'secondary'
  containerClassName?: string
  children?: ReactElement
}

const Section: FC<Props> = ({ anchor, background = 'primary', containerClassName, children }) => (
  <section
    id={anchor}
    className={classNames(styles.container, {
      [styles.secondaryBgColor]: background === 'secondary'
    }, containerClassName)}
    aria-label="Section"
  >
    <div>{ children }</div>
  </section>
)

export default Section