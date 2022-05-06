import React, { FC, InputHTMLAttributes } from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import cn from 'classnames';

import styles from './styles.module.scss';

type Props = {
  className?: string,
  error?: string | boolean,
};

const DEFAULT_MASK_OPTIONS = {
  suffix: '',
  prefix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: '',
  allowDecimal: true,
  decimalSymbol: '.',
  decimalLimit: 10,
  integerLimit: 12,
  allowNegative: false,
  allowLeadingZeroes: false,
  requireDecimal: false,
};

export const InputAmount: FC<Props & InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  placeholder = '',
  onChange,
  value,
  onBlur,
  name,
  disabled,
  error,
}) => {
  const currencyMask = React.useCallback(createNumberMask({
    inputMode: 'numeric',
    ...DEFAULT_MASK_OPTIONS,
  }), []);

  return (
    <div className={cn(styles.inputWrapper)}>
      <MaskedInput
        mask={currencyMask}
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
};
