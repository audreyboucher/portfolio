import React from 'react';

import { Button } from '../common/ui';
import { TextCarrousel } from '..';

import styles from './SummarySection.module.scss';

const SummarySection = () => (
  <section className={styles.container}>
    <div>
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

        <Button text="Download resume" />
      </article>

      <figure className={styles.imageContainer}>
        <img src="" alt="" />
      </figure>
    </div>
  </section>
);

export default SummarySection;
