import type { FC } from 'react'
import classNames from 'classnames'

import { Icon, Icons } from '@/components/ui'

import styles from './SourceLink.module.scss'

export type Props = {
  text: string
  icon: Icons
  link: string
  disabled?: boolean
}

export const SOURCE_LINKS: Props[] = [
  {
    text: "github",
    icon: Icons.Code,
    link: "https://github.com/audreyboucher/portfolio"
  },
  {
    text: "figma",
    icon: Icons.Image,
    link: "https://www.figma.com/design/gg5eF6rQ0m0KwHf52zqwZq/Portfolio"
  },
  {
    text: "storybook",
    icon: Icons.Pen,
    link: import.meta.env.VITE_STORYBOOK_URL as string
  },
]

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