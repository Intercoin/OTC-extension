import React, {
  FC, useContext,
} from 'react';

import { Navigate, Route, Routes } from 'react-router';
import { ContextProvider } from 'contexts';
import { ROUTES } from './constants';
import {
  Auth,
  Main,
} from './screens';

import styles from './styles.module.scss';
import { ContextProviderT } from './contexts/types';

const App: FC = () => {
  const { state } = useContext<ContextProviderT>(ContextProvider);

  const selectAccountJSON = localStorage.getItem('selectAccount');
  const selectAccount = JSON.parse(selectAccountJSON || '{}');

  const isLogin = selectAccount?.address || state.selectAccount.address;

  return (
    <div className={styles.main}>
      <div className={styles.pages}>
        <Routes>
          {
            !isLogin ? (
              <>
                <Route
                  path="auth/*"
                  element={<Auth />}
                />

                <Route
                  path="*"
                  element={<Navigate to={'/auth'} />}
                />
              </>
            ) : (
              <>
                <Route
                  path="main/*"
                  element={<Main />}
                />
                <Route
                  path="*"
                  element={<Navigate to={`/${ROUTES.main.root}`} />}
                />
              </>
            )
          }
        </Routes>
      </div>
    </div>
  );
};

export default App;
