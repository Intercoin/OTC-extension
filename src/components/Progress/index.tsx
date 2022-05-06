import React, { FC, PropsWithChildren } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

export type Value = {
  value: boolean,
  name: string,
};

type Props = {
  className?: string,
  params: Value[]
};

export const Progress: FC<PropsWithChildren<Props>> = ({ params }) => (
  <div className={styles.container}>
    {
      params.map(({ value, name }) => (
        <>
          <div className={cn(styles.progress, { [styles.done]: value })} />

          <div className={cn(styles.step, { [styles.active]: value })}>
            {name}
          </div>
        </>
      ))
    }
  </div>
);
