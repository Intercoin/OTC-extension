import React, { FC } from 'react';
import Select from 'react-select';
import { LogoMenuControl } from './LogoMenuControl';
import { LogoMenuOption, Props } from './LogoMenuOption';

import styles from './styles.module.scss';
import { ROUTES } from '../../constants';

export const LogoMenu: FC = () => {
  const list = [
    {
      value: ROUTES.main.importAccount,
      label: 'Import account',
    },
    {
      value: ROUTES.main.switchRole,
      label: 'Main page',
    },
  ];

  return (
    <div className={styles.dropdown}>
      <Select
        styles={{
          control: (base) => ({
            ...base,
            border: 0,
            boxShadow: 'none',
          }),
          menu: (base) => ({
            ...base,
            width: 'fix-content',
            right: 0,
          }),
          valueContainer: (base) => ({
            ...base,
            position: 'absolute',
            padding: 0,
          }),
          menuList: (base) => ({
            ...base,
            background: 'transparent',
            color: 'black',
          }),
        }}
        components={{
          Control: LogoMenuControl,
          IndicatorSeparator: null,
          IndicatorsContainer: () => null,
          SingleValue: () => null,
          Option: (props) => LogoMenuOption(props as Props),
        }}
        placeholder={false}
        isSearchable={false}
        options={list}
      />
    </div>
  );
};
