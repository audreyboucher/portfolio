import classNames from 'classnames'

import { Icon, Icons } from '@/components/ui'

import styles from './FooterLink.module.scss'

export type Props = {
  name: string
  detail: string
  url?: string
}

const FooterLink = ({ name, detail, url }: Props) => (
  <a
    href={url || '#'}
    aria-label={name}
    tabIndex={0}
    className={classNames(styles.container, { [styles.nonClickable]: !url })}
  >
    <figure>
      <Icon icon={name.toLowerCase() as Icons} label={name} />
    </figure>

    <div>
      <h6>{name}</h6>
      <p className={classNames({ [styles.callToAction]: url?.includes('http') })}>{detail}</p>
    </div>
  </a>
)

export default FooterLink