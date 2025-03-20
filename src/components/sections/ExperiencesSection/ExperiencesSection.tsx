import React from 'react';

import Section from '../Section/Section';
import { Experience, ExperienceType } from '../..';

import EXPERIENCES from './Experiences.json';
import styles from './ExperiencesSection.module.scss';
import { Separator } from '../../common/ui';

const ExperiencesSection = () => {
  const experiences = EXPERIENCES as ExperienceType[];

  return (
    <Section anchor="experiences" containerClassName={styles.section}>
      <div className={styles.container}>
        <h4 className={styles.title}>Experiences</h4>
        <p className={styles.subtitle}>A journey towards success</p>

        <div className={styles.experiencesContainer}>
          { experiences.map((props, index) => <Experience key={index} {...props} />) }
          <Separator direction="vertical" containerClassName={styles.line} />
        </div>
      </div>
    </Section>
  );
};

export default ExperiencesSection;
