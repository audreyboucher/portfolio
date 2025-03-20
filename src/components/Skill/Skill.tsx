import React from 'react';

import { ProgressBar, AdditionalInfo } from '../common/ui';

import styles from './Skill.module.scss';
import colors from '../../styles/_colors.scss';

export type SkillType = {
  name: string;
  value: number;
  info?: string;
};

type Props = SkillType & { launchAnimation?: boolean };

const Skill = ({ name, value, info, launchAnimation = false }: Props) =>
  <ProgressBar
    type="circle"
    value={value}
    color={colors[`skill_${name.toLowerCase()}`]}
    animationDuration={2}
    launchAnimation={launchAnimation}
    containerClassName={styles.container}
  >
    <div className={styles.contentContainer}>
      <figure className={styles.imageContainer}>
        <img src={require(`./images/${name.toLowerCase()}.svg`)} alt={name} />
      </figure>

      <p>{name}</p>

      {info && <AdditionalInfo text={info} />}
    </div>
  </ProgressBar>;

export default Skill;
