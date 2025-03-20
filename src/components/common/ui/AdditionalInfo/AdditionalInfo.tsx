import React, { useState, useRef } from 'react';
import { useMouseMove, useValue, animate } from 'react-ui-animate';
import classNames from 'classnames';

import styles from './AdditionalInfo.module.scss';

type Props = {
  text: string;
  containerClassName?: string;
  questionMarkClassName?: string;
  infoBoxClassName?: string;
};

const AdditionalInfo = ({ text, containerClassName, questionMarkClassName, infoBoxClassName }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const x = useValue(ref.current ? ref.current.getBoundingClientRect().left : 0);
  const y = useValue(ref.current ? ref.current.getBoundingClientRect().top : 0);

  useMouseMove(({ mouseX, mouseY }) => {
    x.value = mouseX - ref.current!.getBoundingClientRect().left;
    y.value = mouseY - ref.current!.getBoundingClientRect().top;
  });

  return (
    <div className={classNames(styles.container, containerClassName)}>
      <div
        className={styles.mouveOverZone}
        onMouseOver={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        ref={ref}
      ></div>
      <span className={classNames(styles.questionMark, questionMarkClassName)}>?</span>
      <animate.div
        className={classNames(styles.infoBox, infoBoxClassName, { [styles.visible]: isVisible })}
        style={{ translateX: x.value, translateY: y.value }}
      >
        { text }
      </animate.div>
    </div>
  );
};

export default AdditionalInfo;
