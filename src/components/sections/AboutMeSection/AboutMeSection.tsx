import React, { useState, useEffect, useTransition } from 'react';
import classNames from 'classnames';

import Section from '../Section/Section';
import { ImageCarrousel, ANIMATION_DURATION } from '../..';
import { ProgressBar } from '../../common/ui';

import slides from './AboutMe.json';
import styles from './AboutMeSection.module.scss';
import variables from '../../../styles/_variables.scss';

type Slide = {
  keywords: string[];
  description: string[];
  cover: string[];
};

const { INTERVAL_DURATION } = variables;
const PARSED_INTERVAL_DURATION = parseInt(INTERVAL_DURATION) * 1000;

const AboutMeSection = () => {
  const [isPending, startTransition] = useTransition();
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  const onSelectAction = (n: number) => {
    if (!isPending) {
      setSelectedItem(n);
      startTransition(async () => {
        await new Promise(resolve => setTimeout(resolve, ANIMATION_DURATION));
      });
    }
  };

  useEffect(() => {
    const id = setInterval(() => {
      onSelectAction(selectedItem === slides.length - 1 ? 0 : selectedItem + 1);
    }, PARSED_INTERVAL_DURATION);
  
    return () => clearInterval(id);
  });

  useEffect(() => {
    setProgress(0);
    setTimeout(() => setProgress(100), 50);
  }, [selectedItem]);

  useEffect(() => setProgress(100), []);

  return (
    <Section anchor='about' background='secondary' containerClassName={styles.container}>
      <>
        <aside  className={styles.carrouselImageContainer}>
          <ImageCarrousel
            images={slides.map(({ cover, keywords }, index) => ({
              path: cover.map((image) => require(`./images/${ image }`)),
              alt: keywords.join(' & '),
              index
            }))}
            selected={selectedItem}
            onSelect={onSelectAction}
          />
        </aside>

        <article className={styles.textContainer}>
          <h4 className={styles.title}>About me</h4>
          <ProgressBar value={progress} animationDuration={parseInt(INTERVAL_DURATION)} />
          <ul className={styles.carrouselTextContainer}>
            {slides.map(({ keywords, description }: Slide, index) => (
              <li
                className={classNames(styles.carrouselText, { [styles.selected]: index === selectedItem })}
                key={index}
                onClick={() => onSelectAction(index)}
              >
                <h5>{keywords.map((keyword, i) => <span key={i}>{ keyword }</span>)}</h5>
                <div>
                  {description.map((paragraph, i) => <p key={i}>{ paragraph }</p>)}
                </div>
              </li>
            ))}
          </ul>
        </article>
      </>
    </Section>
  );
};

export default AboutMeSection;
