import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import styles from './ImageCarrousel.module.scss';

type Image = {
  index: number;
  path: string[];
  alt: string;
};

type Props = {
  images: Image[];
  selected: Image['index'];
  onSelect: (index: Image['index']) => void;
  containerClassName?: string;
};

export const ANIMATION_DURATION = 1000;

const ImageCarrousel = ({ images, selected, onSelect, containerClassName }: Props) => {
  const [isAnimationOn, setIsAnimationOn] = useState<boolean>(false);
  const [orderedImages, setOrderedImages] = useState<Image[]>(images);
  const [nextSelection, setNextSelection] = useState<number>(selected);

  const getSelectionIndex = (imagesList: Image[], current: number) => imagesList.findLastIndex(({ index }) => index === current);

  useEffect(() => {
    if (selected === nextSelection)
      return;

    setIsAnimationOn(true);
    onSelect(selected);
    setNextSelection(selected);
    setOrderedImages((tmp) => [...tmp, ...tmp.slice(0, getSelectionIndex(tmp, selected))]);

    const id = setTimeout(() => {
      setOrderedImages((tmp) => {
        const index = getSelectionIndex(tmp, selected);
        return index ? tmp.slice(index) : tmp;
      });

      setIsAnimationOn(false);
    }, ANIMATION_DURATION);

    return () => clearTimeout(id);
  }, [selected]);

  return (
    <ul className={classNames(styles.container, { [styles.animate]: isAnimationOn }, containerClassName)}>
      {
        orderedImages.map(({ alt, path, index }, i) => (
          <li
            key={`listItem${ index }-${ i }`}
            className={styles.listItem}
            onClick={() => onSelect(index)}
            attr-position={i - getSelectionIndex(orderedImages, nextSelection)}
            attr-duplicate={i !== orderedImages.findIndex(({ index: tmp }) => tmp === index) ? 1 : 0}
          >
            <figure>
              {path.map((image, imageIndex) => <img key={`image${ index }-${ i }-${ imageIndex }`} src={image} alt={alt} />)}
            </figure>
          </li>
        ))
      }
    </ul>
  );
};

export default ImageCarrousel;
