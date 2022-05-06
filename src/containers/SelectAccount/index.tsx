import React, { FC, useContext, useMemo } from 'react';
import { ContextProvider } from 'contexts';
import { ContextProviderT } from 'contexts/types';
import Select, { SingleValue } from 'react-select';
import { Value } from './types';

import styles from './styles.module.scss';

export const SelectAccount: FC = () => {
  const { state, dispatch } = useContext<ContextProviderT>(ContextProvider);

  const list = useMemo(() => state.accountList.map(
    (account) => ({
      value: {
        logo: account.logo,
        address: account.address,
      },
      label: account.name,
    }),
  ), [state.accountList]);

  const handleChangeAccount = async (account: SingleValue<Value>) => {
    if (!account) return;

    const payload = {
      logo: account.value.logo,
      address: account.value.address,
      name: account.label,
    };

    dispatch({
      type: 'SELECTED_ACCOUNT',
      payload,
    });

    localStorage.setItem('selectAccount', JSON.stringify(payload));
  };

  const selectedNetwork: Value = {
    value: {
      logo: state.selectAccount.logo,
      address: state.selectAccount.address,
    },
    label: state.selectAccount.name,
  };

  return (
    <div className={styles.dropdown}>
      <Select
        value={selectedNetwork}
        options={list}
        onChange={(account) => handleChangeAccount(account)}
      />
    </div>
  );
};
