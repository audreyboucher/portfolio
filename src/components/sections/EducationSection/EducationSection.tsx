import React from 'react';

import Section from '../Section/Section';
import { Formation, FormationType } from '../..';

import EDUCATION_JSON from './Education.json';
import styles from './EducationSection.module.scss';

const EducationSection = () => {
  const formations = EDUCATION_JSON as FormationType[];

  return (
    <Section anchor="education" background="secondary" containerClassName={styles.container}>
      <div className={styles.contentContainer}>
        <h4 className={styles.title}>Education</h4>
        { formations.map((props, index) => <Formation key={index} {...props} />) }
      </div>
    </Section>
  );
};

export default EducationSection;
