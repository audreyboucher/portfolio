import React from 'react';
import classNames from 'classnames';

import { scrollToAnchor } from '../../../../utils/scroll';

import styles from './NavItem.module.scss';

type Item = {
  name: string;
  anchor?: string;
  disabled?: boolean;
};

type Props = Item & { subMenu?: Item[]; };

const SubMenu = ({ items }: { items: Item[] }) => {
  return (
    <ul className={styles.subMenu}>
      { items.map(({ name, anchor }, i) => (
        <li
          key={i}
          onClick={() => scrollToAnchor(anchor)}
        >
          { name }
        </li>
      )) }
    </ul>
  );
};

const NavItem = ({ name, anchor, subMenu, disabled }: Props) => (
  <li
    className={classNames(styles.listItem, {
      [styles.hasSubMenu]: subMenu,
      [styles.disabled]: disabled
    })}
  >
    <span onClick={() => scrollToAnchor(anchor)}>{ name }</span>
    {subMenu && <SubMenu items={subMenu} />}
  </li>
);

export default NavItem;
