import React, { useState } from 'react';
import classNames from 'classnames';

import { Button, NavItem } from '../common/ui';
import { SourceLink } from '..';

import type { SourceLinkType } from '..';

import SOURCE_LINKS from '../sections/SummarySection/SourceLinks.json';
import styles from './Nav.module.scss';

const Nav = () => {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  const source_links = SOURCE_LINKS as SourceLinkType[];

  return (
    <nav className={classNames({ [styles.isMenuOpened]: isMenuOpened })}>
      <Button onClick={() => setIsMenuOpened((tmp) => !tmp)} className={classNames(styles.button, styles.mobileOnly)}>
        <img src={require(`./icons/${ isMenuOpened ? 'cross' : 'menu' }.svg`)} alt={isMenuOpened ? 'Close menu' : 'Open menu'} />
      </Button>

      <ul className={styles.list}>
        <div>
          <div>
            <NavItem name="Home" anchor="home" onClick={() => setIsMenuOpened(false)} />
            <NavItem
              name="About"
              anchor="about"
              subMenu={[
                { name: 'About me', anchor: 'about' },
                { name: 'Skills', anchor: 'skills' },
                { name: 'Education', anchor: 'education' },
                { name: 'Experiences', anchor: 'experiences' },
              ]}
              onClick={() => setIsMenuOpened(false)}
            />
            <NavItem name="One App project" disabled />
            <NavItem name="Contact" anchor="contact" onClick={() => setIsMenuOpened(false)} />
          </div>

          <div className={classNames(styles.sourceLinks, styles.mobileOnly)}>
            { source_links.map((props, index) => <SourceLink {...props} key={index} />) }
          </div>
        </div>

        <span className={classNames(styles.overlay, styles.mobileOnly)} onClick={() => setIsMenuOpened(false)}></span>
      </ul>
    </nav>
  );
};

export default Nav;
