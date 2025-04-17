import React from 'react';

import { FooterLink } from '..';
import type { FooterLinkType } from '..';

import LINKS_JSON from './Links.json';
import styles from './Footer.module.scss';

const Footer = () => {
  const links = LINKS_JSON as FooterLinkType[];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.linksContainer}>
          { links.map((props, index) => <FooterLink {...props} key={index} />) }
        </div>

        <p className={styles.copyright}>© Audrey Boucher 2025 | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
