import React from 'react';

import { Logo, LogoVersion } from '../common/ui';
import Nav from '../Nav/Nav';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles.maxWidth}>
        <aside className={styles.logoContainer}>
          <Logo version={LogoVersion.Dark} containerClassName={styles.logo} />
          <h1>Audrey B.</h1>
        </aside>
        <Nav />
      </div>
    </header>
  );
};

export default Header;
