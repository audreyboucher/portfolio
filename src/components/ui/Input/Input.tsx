import type { DetailedHTMLProps, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import classNames from 'classnames'

import type { Common } from '@/types'

import styles from './Input.module.scss'

type InputType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type TextareaType = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

export type Props = {
  type: InputType['type'] | 'textarea'
  label: string
  error?: string
} & Common<InputType, TextareaType>

const Input = ({ type, label, error, ...props }: Props) => {
  const id = label.toLowerCase()

  const commonProps = {
    id,
    name: id,
    placeholder: label,
    tabIndex: props.disabled ? -1 : 0,
    ...(props.disabled ? { 'aria-disabled': true } : {}),
    ...props,
  }

  return (
    <div
      className={classNames(styles[type === 'textarea' ? 'textareaContainer': 'inputContainer'], {
        [styles.error]: !!error?.length,
        [styles.disabled]: !!props.disabled,
      })}
    >
      {!!error?.length && <p className={styles.errorMessage} aria-label={`${label} Error`}>{error}</p>}

      <label htmlFor={label.toLowerCase()} aria-labelledby={id}>{label}</label>

      {type === 'textarea'
        ? <textarea {...commonProps} />
        : <input {...commonProps} />
      }
    </div>
  )
}

export default Input