import React from 'react';
import classNames from 'classnames';

import { scrollToAnchor } from '../../../../utils/scroll';

import styles from './NavItem.module.scss';

type Item = {
  name: string;
  anchor?: string;
  disabled?: boolean;
  onClick?: Function;
};

type Props = Item & { subMenu?: Item[]; };

const SubMenu = ({ subMenu: items, onClick }: Props) => (
  <ul className={styles.subMenu}>
    { items!.map(({ name, anchor }, i) => (
      <li
        key={i}
        onClick={() => {
          scrollToAnchor(anchor);
          onClick && onClick();
        }}
      >
        { name }
      </li>
    )) }
  </ul>
);

const NavItem = (props: Props) => (
  <li
    className={classNames(styles.listItem, {
      [styles.hasSubMenu]: props.subMenu,
      [styles.disabled]: props.disabled
    })}
  >
    <span
      onClick={() => {
        scrollToAnchor(props.anchor);
        props.onClick && props.onClick();
      }}
    >
      { props.name }
    </span>
    {props.subMenu && <SubMenu {...props} />}
  </li>
);

export default NavItem;
