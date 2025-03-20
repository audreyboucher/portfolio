import React from 'react';
import classNames from 'classnames';

import styles from './Experience.module.scss';

export type ExperienceType = {
  company: string;
  position: string;
  description: string[];
  contractType?: string;
  location: string;
  start: string;
  end?: string;
  tools: string[];
};

type Props = ExperienceType & { containerClassName?: string; };

const Experience = ({ company, position, description, contractType, location, start, end, tools, containerClassName }: Props) => {
  return (
    <article className={classNames(styles.container, containerClassName)}>
      <div className={styles.details}>
        <div>
          <p>{ start + (end ? `-${ end }` : null) }</p>
          <h6>{ company }</h6>
        </div>

        <h5>{ position }</h5>

        <ul>
          {
            description.map((el, index) =>
              <li key={`${ company.toLowerCase().replace(' ', '_') }-${ position.toLowerCase().replace(' ', '_') }-${ index }`}>{ el }</li>
            )
          }
        </ul>

        <p>{ contractType }</p>
        <p>{ location }</p>
      </div>

      <ul className={styles.tools}>
        {
          tools.map((el) =>
            <li key={`${ company.toLowerCase().replace(' ', '_') }-${ position.toLowerCase().replace(' ', '_') }`}>
              <figure>
                <img src={require(`./images/${ el.toLowerCase() }.svg`)} alt={el} />
                <figcaption>{ el }</figcaption>
              </figure>
            </li>
          )
        }
      </ul>
    </article>
  );
};

export default Experience;
