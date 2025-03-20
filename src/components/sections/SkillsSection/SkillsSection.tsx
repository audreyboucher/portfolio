import React, { useRef } from 'react';

import useIsVisible from '../../../hooks/useIsVisible';

import Section from '../Section/Section';
import { Separator } from '../../common/ui';
import { Skill, SkillType } from '../..';

import SKILLS_JSON from './Skills.json';
import styles from './SkillsSection.module.scss';

type SkillListProps = {
  list: SkillType[];
  launchAnimation: boolean;
};

const SkillList = ({ list, launchAnimation }: SkillListProps) => (
  <div className={styles.listContainer}>
    { list.map((props) => <Skill {...props} key={props.name} launchAnimation={launchAnimation} />) }
  </div>
);

const SkillsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const targetElementVisible = useIsVisible(ref);

  const { technologies, apps } = SKILLS_JSON as Record<string, SkillType[]>;

  return (
    <Section anchor="skills" background="secondary" containerClassName={styles.section}>
      <div ref={ref} className={styles.container}>
        <h4 className={styles.title}>Technologies <span>&&</span> apps/tools</h4>

        <SkillList list={technologies} launchAnimation={targetElementVisible} />

        <Separator direction="vertical" />

        <SkillList list={apps} launchAnimation={targetElementVisible} />
      </div>
    </Section>
  );
};

export default SkillsSection;
