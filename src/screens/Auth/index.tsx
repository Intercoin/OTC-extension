import React, { FC } from 'react';

import { Navigate, Route, Routes } from 'react-router';
import { ROUTES } from '../../constants';
import { Registration } from './Registration';
import { ImportAccount } from './ImportAccount';
import { PreAuth } from './PreAuth';

import styles from './styles.module.scss';

export const Auth: FC = () => (
  <div className={styles.main}>
    <Routes>
      <Route
          path={ROUTES.auth.root}
          element={<PreAuth />}
        />

      <Route
        path={ROUTES.auth.importAccount}
        element={<ImportAccount />}
      />

      <Route
          path={ROUTES.auth.welcome}
          element={<Registration />}
      />

      <Route
          path="*"
          element={<Navigate to={`/auth/${ROUTES.auth.root}`} />}
        />
    </Routes>
  </div>
);
