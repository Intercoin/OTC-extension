import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import styles from './styles.module.scss';

export type Value = {
  name: string,
  to: string,
  status: boolean,
};

type Props = {
  className?: string,
  tabs: Value[]
};

export const NavTab: FC<Props> = ({ tabs, className }) => {
  const { pathname } = useLocation();

  return (
    <div className={cn(styles.container, className)}>
      {
        tabs.map(({ name, to }) => (
          <Link key={name} to={to} className={cn(styles.tab, { [styles.active]: pathname.includes(name.toLowerCase()) })}>
            {/* <div className={cn(styles.status, { [styles.done]: status })} /> */}
            {name}
          </Link>
        ))
      }
    </div>
  );
};
