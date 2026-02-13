import type { FC, ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'

import styles from './Button.module.scss'

type Props = {
  text?: string
  disabled?: boolean
  loading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const Loader: FC = () => (
  <div className={styles.loader} aria-label="Loading">
    { new Array(4).fill(0).map((_, index) => <div key={index} />) }
  </div>
)

const Button: FC<Props> = ({ text, disabled, loading, className, children, ...props }) => 
  <button
    {...props}
    className={classNames(styles.button, { [styles.loading]: loading }, className)}
    disabled={disabled}
    aria-disabled={disabled}
    tabIndex={disabled || loading ? -1 : 0}
  >
    { loading ? <Loader /> : <span>{ text || children }</span>}
  </button>

export default Button