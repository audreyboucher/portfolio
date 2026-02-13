import type { FC } from 'react'
import classNames from 'classnames'

import { Icon, type Icons } from '@/components/ui'

import styles from './SourceLink.module.scss'

export type Props = {
  text: string
  icon: Icons
  link: string
  disabled?: boolean
}

const SourceLink: FC<Props> = ({ text, icon, link, disabled }) => (
  <a
    className={classNames(styles.container, { [styles.disabled]: disabled })}
    href={link}
    target="_blank"
    rel="noreferrer"
    aria-disabled={disabled}
    tabIndex={disabled ? -1 : 0}
    aria-label="Source link"
    aria-labelledby={`source_link_${icon}`}
  >
    <Icon icon={icon} label="Source link" className={styles.icon} />
    <span id={`source_link_${icon}`}>{ text }</span>
  </a>
)

export default SourceLink