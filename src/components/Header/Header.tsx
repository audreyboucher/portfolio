import React from 'react';

import { Logo, LogoVersion } from '../common/ui';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.container}>
      <div>
        <Logo version={LogoVersion.Dark} containerClassName={styles.logo} />
      </div>
    </header>
  );
};

export default Header;
