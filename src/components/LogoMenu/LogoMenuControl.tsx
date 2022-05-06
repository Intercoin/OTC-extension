import React, { FC } from 'react';

import { ControlProps, components } from 'react-select';

import styles from './styles.module.scss';

export const LogoMenuControl: FC<ControlProps> = ({ children, ...props }) => (
  <components.Control {...props} className={styles.control}>
    <div className={styles.avatar}>
      OTC
    </div>
    {children}
  </components.Control>
);
