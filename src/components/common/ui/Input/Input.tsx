import React, { DetailedHTMLProps, InputHTMLAttributes, TextareaHTMLAttributes, EventHandler, FocusEvent, ChangeEvent } from 'react';
import classNames from 'classnames';

import type { Common } from '../../types';

import styles from './Input.module.scss';

type InputType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type TextareaType = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

type Props = {
  type: InputType['type'] | 'textarea';
  label: string;
  isFocused?: boolean;
  error?: string;
  removeError?: Function,
  onFocus?:  EventHandler<FocusEvent<any>>;
  onBlur?: EventHandler<FocusEvent<any>>;
  onChange?: EventHandler<ChangeEvent<any>>;
} & Common<InputType, TextareaType>;

const Input = ({ type, label, isFocused, error, removeError, onFocus, onBlur, onChange, ...props }: Props) => {
  const id = label.toLowerCase();

  const commonProps = {
    id,
    name: id,
    onChange: (value: ChangeEvent<any>) => {
      onChange && onChange(value);
      removeError && removeError();
    },
    ...props,
  };

  return (
    <div
      className={classNames(styles[type === 'textarea' ? 'textareaContainer': 'inputContainer'], {
        [styles.focus]: isFocused,
        [styles.error]: !!error?.length,
        [styles.disabled]: !!props.disabled
      })}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      { !!error?.length && <p className={styles.errorMessage}>{ error }</p> }
      <label htmlFor={label.toLowerCase()}>{ label }</label>
      {
        type === 'textarea'
          ? <textarea {...commonProps} />
          : <input {...commonProps} />
      }
    </div>
  );
};

export default Input;
