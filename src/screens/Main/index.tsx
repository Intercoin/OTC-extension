import React, {
  FC, useContext, useEffect,
} from 'react';
import { Navigate, Route, Routes } from 'react-router';
import {
  SwitchRole,
  Creator,
  Follower,
  Header,
  ImportAccount,
} from 'containers';
import { ContextProvider } from 'contexts';
import { ContextProviderT } from 'contexts/types';
import { initialState } from 'contexts/initialState';
import { Loader } from 'components';
import { ROUTES } from '../../constants';

import styles from './styles.module.scss';

export const Main: FC = () => {
  const { state, dispatch } = useContext<ContextProviderT>(ContextProvider);

  useEffect(() => {
    if (!state.selectAccount.address && !state.selectNetwork.httpProvider) {
      initialState(dispatch);
    }
  }, [state.selectAccount.address, state.selectNetwork.httpProvider]);

  return (
    state.selectAccount.address ? (
      <div className={styles.main}>
        <Header />
        <Routes>
          <Route
            path="switch-role"
            element={<SwitchRole />}
          />
          <Route
            path="creator/*"
            element={<Creator />}
          />
          <Route
            path="follower/*"
            element={<Follower />}
          />
          <Route
            path="import-account"
            element={<ImportAccount />}
          />
          <Route
            path="*"
            element={<Navigate to={`/main/${ROUTES.main.switchRole}`} />}
          />
        </Routes>
      </div>
    ) : <Loader />
  );
};
