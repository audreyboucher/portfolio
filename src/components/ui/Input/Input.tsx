import type { DetailedHTMLProps, InputHTMLAttributes, TextareaHTMLAttributes, EventHandler, ChangeEvent } from 'react'
import classNames from 'classnames'

import type { Common } from '@/types'

import styles from './Input.module.scss'

type InputType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type TextareaType = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

export type Props = {
  type: InputType['type'] | 'textarea'
  label: string
  error?: string
  onChange?: EventHandler<ChangeEvent<HTMLElement>>
} & Common<InputType, TextareaType>

const Input = ({ type, label, error, onChange, ...props }: Props) => {
  const id = label.toLowerCase()

  const commonProps = {
    id,
    name: id,
    placeholder: label,
    tabIndex: 0,
    onChange: (value: ChangeEvent<HTMLElement>) => {
      if (onChange) onChange(value)
    },
    ...props,
  }

  return (
    <div
      className={classNames(styles[type === 'textarea' ? 'textareaContainer': 'inputContainer'], {
        [styles.error]: !!error?.length,
        [styles.disabled]: !!props.disabled,
      })}
    >
      {!!error?.length && <p className={styles.errorMessage}>{ error }</p>}
      <label htmlFor={label.toLowerCase()}>{ label }</label>
      {type === 'textarea'
        ? <textarea {...commonProps} />
        : <input {...commonProps} />
      }
    </div>
  )
}

export default Input