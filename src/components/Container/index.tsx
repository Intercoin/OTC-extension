import React, {
  FC,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
} from 'react';

import cn from 'classnames';

import styles from './styles.module.scss';

type Props = {
  className?: string,
  onClick?: MouseEventHandler,
  loading?: boolean;
  title: ReactNode,
  text: ReactNode,
};

export const Container: FC<PropsWithChildren<Props>> = ({
  className,
  title,
  text,
  children,
}) => (
  <div className={cn(styles.container, className)}>
    <div className={styles.header}>
      <div className={styles.titleWrap}>
        <div className={styles.title}>
          {title}
        </div>

        <div className={styles.subtitle}>
          {text}
        </div>
      </div>
    </div>

    <div className={styles.separator} />

    <div className={styles.childrenWrapper}>
      {children}
    </div>

  </div>
);
