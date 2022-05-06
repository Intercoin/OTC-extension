import React, { FC } from 'react';
import Select, { Props as PropsSelect } from 'react-select';
import cn from 'classnames';

import styles from './styles.module.scss';

type Props = {
  className?: string,
  name?: string,
  error?: string | boolean,
  value: PropsSelect['value'],
  options: PropsSelect['value'][],
  onChange: PropsSelect['onChange'],
  onBlur?: PropsSelect['onBlur'],
};

export const Dropdown: FC<Props> = ({
  className,
  value,
  options,
  onChange,
  name,
  onBlur,
  error,
}) => (
  <div className={cn(className, { [styles.error]: !!error })}>
    <Select
      onBlur={onBlur}
      name={name}
      value={value}
      options={options}
      onChange={onChange}
    />
  </div>
);
