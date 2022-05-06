import React, { FC, InputHTMLAttributes } from 'react';

import cn from 'classnames';

import styles from './styles.module.scss';

type Props = {
  className?: string,
  error?: string | boolean,
};

export const Input: FC<Props & InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  placeholder = '',
  onChange,
  value,
  onBlur,
  name,
  disabled,
  error,
  type,
}) => (
  <div className={cn(styles.inputWrapper)}>
    <input
      type={type}
      disabled={disabled}
      onBlur={onBlur}
      name={name}
      value={value}
      onChange={onChange}
      className={cn(styles.input, { [styles.error]: !!error }, className)}
      placeholder={placeholder}
    />
  </div>
);
