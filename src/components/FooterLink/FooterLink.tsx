import React from 'react';
import classNames from 'classnames';

import styles from './FooterLink.module.scss';

export type Props = {
  name: string;
  detail: string;
  url?: string;
  callToAction?: boolean;
};

const FooterLink = ({ name, detail, url, callToAction = false }: Props) => {
  return (
    <a href={url || '#'} className={classNames(styles.container, { [styles.nonClickable]: !url })}>
      <figure>
        <img src={require(`./icons/${name.toLowerCase()}.svg`)} alt={name} />
      </figure>

      <div>
        <h6>{ name }</h6>
        <p className={classNames({ [styles.callToAction]: callToAction })}>{ detail }</p>
      </div>
    </a>
  );
};

export default FooterLink;
