import React, {
  FC,
  MouseEventHandler,
  PropsWithChildren,
  ButtonHTMLAttributes,
} from 'react';
import cn from 'classnames';
import { Loader } from 'components';

import styles from './styles.module.scss';

type Props = {
  className?: string,
  onClick?: MouseEventHandler,
  disabled?: boolean,
  isLoading?: boolean,
  type?: ButtonHTMLAttributes<string>['type'],
};

export const Button: FC<PropsWithChildren<Props>> = ({
  onClick,
  className,
  disabled,
  type = 'button',
  isLoading,
  children,
}) => (
  <button
    disabled={disabled}
    onClick={isLoading ? () => {} : onClick}
    type={type}
    className={cn(styles.button, className)}
  >
    {isLoading ? <Loader /> : children}
  </button>
);
