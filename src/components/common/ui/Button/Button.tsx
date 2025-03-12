import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

type Props = { text: string } & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ text, className, ...props }: Props) => 
  <button className={classNames(styles.button, className)} {...props}>
    <span>{text}</span>
  </button>;

export default Button;
