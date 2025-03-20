import React, { useRef } from 'react';
import { useMouseMove, useValue, animate } from 'react-ui-animate';
import parse from 'html-react-parser';
import classNames from 'classnames';

import styles from './AdditionalInfo.module.scss';

type Props = {
  text: string;
  containerClassName?: string;
  questionMarkClassName?: string;
  infoBoxClassName?: string;
};

const AdditionalInfo = ({ text, containerClassName, questionMarkClassName, infoBoxClassName }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const getPosition = (axis: 'top' | 'left'): number => ref.current?.getBoundingClientRect()[axis] || 0;

  const x = useValue(getPosition('left'));
  const y = useValue(getPosition('top'));

  useMouseMove(({ mouseX, mouseY }) => {
    x.value = mouseX - getPosition('left');
    y.value = mouseY - getPosition('top');
  });

  return (
    <div className={classNames(styles.container, containerClassName)}>
      <div className={styles.mouseOverZone} ref={ref}></div>
      <span className={classNames(styles.questionMark, questionMarkClassName)}>?</span>
      <animate.div
        className={classNames(styles.infoBox, infoBoxClassName)}
        style={{ translateX: x.value, translateY: y.value }}
      >
        { parse(text) }
      </animate.div>
    </div>
  );
};

export default AdditionalInfo;
