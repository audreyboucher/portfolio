import type { FC } from 'react'

import styles from './Tag.module.scss'

type Props = {
  text: string
  type?: 'primary' | 'success' | 'error'
}

const Tag: FC<Props> = ({ text, type = 'primary' }) =>
  <span className={styles.container} data-variant={type}>{text}</span>

export default Tag