import React from 'react';

import styles from './SourceLink.module.scss';

export type Props = {
  text: string;
  icon: string;
  link: string;
};

const SourceLink = ({ text, icon, link }: Props) => (
  <a className={styles.container} href={link} target="_blank" rel="noreferrer">
    <img className={styles.icon} src={require(`./icons/${ icon }.svg`)} alt={text} />
    { text }
  </a>
);

export default SourceLink;
