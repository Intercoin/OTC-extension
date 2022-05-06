import React, { FC, PropsWithChildren } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

type Props = {
  className?: string,
  size?: 'm' | 'l'
};

export const Title: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  size = 'm',
}) => {
  const style = cn(
    styles.title,
    [styles[`size_${size}`]],
    className,
  );

  return (
    <h1 className={style}>
      {children}
    </h1>
  );
};
