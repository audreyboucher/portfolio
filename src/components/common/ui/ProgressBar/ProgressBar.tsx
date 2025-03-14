import React from 'react';
import classNames from 'classnames';

import styles from './ProgressBar.module.scss';

type Props = {
  value?: number;
  className?: string;
};

const ProgressBar = ({ value, className }: Props) => {
  return (
    <div className={classNames(styles.component, { [styles.inProgress]: !!value }, className)}>
      <div style={{ width: `${value || 0}%` }} />
    </div>
  );
};

export default ProgressBar;