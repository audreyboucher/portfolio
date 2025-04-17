import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

type Props = { text?: string } & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ text, className, children, ...props }: Props) => 
  <button className={classNames(styles.button, className)} {...props}>
    <span>{ text || children }</span>
  </button>;

export default Button;
