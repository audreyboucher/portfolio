import React from 'react';

import { NavItem } from '../common/ui';

import styles from './Nav.module.scss';

const Nav = () => {
  return (
    <nav>
      <ul className={styles.list}>
        <NavItem name="Home" anchor="home" />
        <NavItem
          name="About"
          anchor="about"
          subMenu={[
            { name: 'About me', anchor: 'about' },
            { name: 'Skills', anchor: 'skills' },
            { name: 'Education', anchor: 'education' },
            { name: 'Experiences', anchor: 'experiences' },
          ]}
        />
        <NavItem name="One App project" disabled />
        <NavItem name="Contact" anchor="contact" />
      </ul>
    </nav>
  );
};

export default Nav;
