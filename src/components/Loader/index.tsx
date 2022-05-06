import React, { FC } from 'react';

import cn from 'classnames';
import styles from './styles.module.scss';

type Props = {
  className?: string,
};

export const Loader: FC<Props> = ({ className }) => (
  <div className={cn(styles.loaderWrap, className)}>
    <div className={styles.loader} />
  </div>
);
