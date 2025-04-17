import React from 'react';
import classNames from 'classnames';

import { Button } from '../../common/ui';
import { TextCarrousel, SourceLink } from '../..';
import Section from '../Section/Section';

import type { SourceLinkType } from '../..';

import SOURCE_LINKS from './SourceLinks.json';
import styles from './SummarySection.module.scss';

const SummarySection = () => {
  const source_links = SOURCE_LINKS as SourceLinkType[];

  return (
    <Section anchor="home" containerClassName={styles.container}>
      <>
        <article className={styles.textContainer}>
          <div>
            <h2>Hi, I'm Audrey!</h2>
            <h3>
              <TextCarrousel
                words={['react', 'vue', 'javascript', 'creative', 'enthusiast', 'passionate']}
                textClassName={styles.highlightedText}
              /> frontend dev
            </h3>
          </div>

          <p>I’m a JavaScript warrior with a solid experience in frontend development (particularly ReactJS) and a strong UX/UI foundation. My love for challenges and eagerness to learn work wonders for me to translate mockups and ideas into proper functional features.</p>

          <Button text="Download resume" onClick={() => window.open(require('./images/Resume - Audrey BOUCHER.pdf'))} />
        </article>

        <figure className={styles.imageContainer}>
          <img src={require('./images/profile_picture.jpg')} alt="Audrey Boucher" />
        </figure>

        <div className={classNames(styles.linksContainer, styles.desktopOnly)}>
          { source_links.map((props, index) => <SourceLink {...props} key={index} />) }
        </div>
      </>
    </Section>
  );
};

export default SummarySection;
