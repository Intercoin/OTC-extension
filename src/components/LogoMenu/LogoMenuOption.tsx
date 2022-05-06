import { FC } from 'react';

import { OptionProps } from 'react-select';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';

export type Props = OptionProps & {
  data: {
    value: string,
    label: string,
  }
};

export const LogoMenuOption: FC<Props> = ({
  innerRef,
  data,
  innerProps,
  selectProps,
}) => {
  const navigate = useNavigate();

  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={styles.option}
      onClick={() => {
        navigate({
          pathname: data.value,
        });
        selectProps.onMenuClose();
      }}
    >
      {data.label}
    </div>
  );
};
