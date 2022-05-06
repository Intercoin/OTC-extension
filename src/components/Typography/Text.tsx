import React, { FC, PropsWithChildren } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

type Props = {
  className?: string,
};

export const Text: FC<PropsWithChildren<Props>> = ({ children, className }) => (
  <h4 className={cn(styles.text, className)}>
    {children}
  </h4>
);
