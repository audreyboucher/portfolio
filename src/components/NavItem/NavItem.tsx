import type { FC } from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import { Tag } from '@/components/ui'

import { scrollToAnchor } from '@/utils/scroll'

import styles from './NavItem.module.scss'

export type Item = {
  name: string
  anchor?: string
  disabled?: boolean
  onClick?: () => void
}

export type Props = Item & { subMenu?: Item[]; }

const SubMenu: FC<Props> = ({ subMenu: items, disabled, onClick }) => (
  <ul className={styles.subMenu}>
    { items!.map(({ name, anchor, disabled: disabledItem }, i) => {
      const action = () => {
        scrollToAnchor(anchor)
        if (onClick) onClick()
      }

      return (
        <li
          key={i}
          className={classNames({ [styles.disabled]: disabled || disabledItem })}
          onClick={action}
          onKeyUp={({ key }) => { if ([' ', 'Enter'].includes(key)) action(); }}
          tabIndex={disabled || disabledItem ? -1 : 0}
          aria-label="Sub nav item"
          aria-disabled={disabled || disabledItem}
        >
          { name }
        </li>
      )
    }) }
  </ul>
)

const NavItem: FC<Props> = (props) => {
  const { t } = useTranslation('default', { keyPrefix: 'tag' })

  return (
    <li
      className={classNames(styles.listItem, {
        [styles.hasSubMenu]: props.subMenu,
        [styles.disabled]: props.disabled
      })}
      tabIndex={props.disabled ? -1 : 0}
      aria-label="Nav item"
      aria-disabled={props.disabled}
    >
      <span
        onClick={() => {
          scrollToAnchor(props.anchor);
          if (props.onClick) props.onClick();
        }}
      >
        {props.name}
        {props.disabled && <Tag text={t('coming soon')} />}
      </span>
      {props.subMenu && <SubMenu {...props} />}
    </li>
  )
}

export default NavItem