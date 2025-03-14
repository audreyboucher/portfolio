import React, { ReactElement } from 'react';
import classNames from 'classnames';

import styles from './Section.module.scss';

type Props = {
  anchor: string;
  background?: 'primary' | 'secondary';
  containerClassName?: string;
  children?: ReactElement;
};

const Section = ({ anchor, background = 'primary', containerClassName, children }: Props) => {
  return (
    <section
      id={anchor}
      className={classNames(styles.container, {
        [styles.secondaryBgColor]: background === 'secondary'
      }, containerClassName)}
    >
      <div>{ children }</div>
    </section>
  )
};

export default Section;
