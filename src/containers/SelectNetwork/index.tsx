import React, { FC, useContext, useMemo } from 'react';
import { ContextProvider } from 'contexts';
import { ContextProviderT } from 'contexts/types';
import Select, { SingleValue } from 'react-select';
import { Value } from './types';

import styles from './styles.module.scss';

export const SelectNetwork: FC = () => {
  const { state, dispatch } = useContext<ContextProviderT>(ContextProvider);

  const handleChangeNetwork = (network: SingleValue<Value>) => {
    if (!network) return;

    const payload = {
      httpProvider: network.value.httpProvider,
      label: network.label,
      chainId: network.value.chainId,
    };

    dispatch({
      type: 'CHANGE_NET',
      payload,
    });

    localStorage.setItem('selectNetwork', JSON.stringify(payload));
  };

  const selectedNetwork: Value = {
    value: {
      httpProvider: state.selectNetwork.httpProvider,
      chainId: state.selectNetwork.chainId,
    },
    label: state.selectNetwork.label,
  };

  const networkList = useMemo(() => state.networkList.map((network) => ({
    value: {
      httpProvider: network.httpProvider,
      chainId: network.chainId,
    },
    label: network.label,
  })), [state.selectNetwork]);

  return (
    <div className={styles.dropdown}>
      <Select
        value={selectedNetwork}
        options={networkList}
        onChange={(network) => handleChangeNetwork(network)}
      />
    </div>
  );
};
