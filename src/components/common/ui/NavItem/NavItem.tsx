import React from 'react';
import classNames from 'classnames';

import useIsVisible from '../../../../hooks/useIsVisible';
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

const NavItem = ({ name, anchor, subMenu, disabled }: Props) => {
  const { ref, isVisible, setIsVisible } = useIsVisible(false);

  return (
    <li
      className={classNames(styles.listItem, {
        [styles.hasSubMenu]: subMenu,
        [styles.opened]: subMenu && isVisible,
        [styles.disabled]: disabled
      })}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span
        onClick={() => scrollToAnchor(anchor)}
        ref={ref}
      >
        { name }
      </span>
      {subMenu && isVisible && <SubMenu items={subMenu} />}
    </li>
  );
};

export default NavItem;
