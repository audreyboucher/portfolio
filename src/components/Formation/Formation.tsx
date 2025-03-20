import React from 'react';

import styles from './Formation.module.scss';

export type Props = {
  name: string;
  school: string;
  description: string[];
  start: string;
  end?: string;
};

const Formation = ({ name, school, description, start, end }: Props) => {
  return (
    <article className={styles.container}>
      <p>{ start + (end ? ` - ${ end }` : '') }</p>
      <h5>{ name }</h5>
      <h6>{ school }</h6>
      <ul>
        { description.map((el, index) => <li key={`listItem-${school.replaceAll(' ', '_')}-${index}`}>{ el }</li>) }
      </ul>
    </article>
  );
};

export default Formation;
