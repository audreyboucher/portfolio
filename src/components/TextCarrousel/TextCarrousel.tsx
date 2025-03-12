import React, { useState, useEffect, useRef, RefObject } from 'react';
import classNames from 'classnames';

import { firstGoesLast, shuffleExceptFirst } from '../../utils/arrays';

import styles from './TextCarrousel.module.scss';

type Props = {
  words: string[];
  textClassName?: string;
};

const TextCarrousel = ({ words, textClassName }: Props) => {
  const [list, setList] = useState<string[]>([]);
  const [isAnimationOn, setIsAnimationOn] = useState<boolean>(false);
  const [width, setWidth] = useState<number>();

  const items: RefObject<HTMLLIElement | null>[] = [useRef(null), useRef(null)];

  const timer = () => {
    setIsAnimationOn(true);
    setWidth(items[1].current?.offsetWidth);

    setTimeout(() => {
      setList(firstGoesLast(list));
      setIsAnimationOn(false);
    }, 1500);
  }

  useEffect(() => {
    setList(shuffleExceptFirst(words));
  }, [words]);

  useEffect(() => {
    setWidth(items[0].current?.offsetWidth);
  }, [list]);

  useEffect(() => {
    const id = setInterval(timer, 2000);
    return () => clearInterval(id);
  });

  return (
    <ul className={styles.listContainer} style={{ width }}>
      {list.map((el, i) =>
        <li
          className={classNames(styles.listItem, textClassName, { [styles.animate]: isAnimationOn })}
          ref={i < items.length ? items[i] : null}
          key={i}
        >
          {el}
        </li>
      )}
    </ul>
  );
};

export default TextCarrousel;
