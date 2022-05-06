import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { NavTab } from 'components';
import { TradeHashCreate } from './TradeHashCreate';
import { ROUTES } from '../../constants';
import { Engage } from '../Engage';
import { Claim } from '../Claim';

const LIST = [
  {
    name: 'Lock',
    to: ROUTES.main.creator.lock,
    status: true,
  },
  {
    name: 'Engage',
    to: ROUTES.main.creator.engage,
    status: true,
  },
  {
    name: 'Claim',
    to: ROUTES.main.creator.claim,
    status: false,
  },
];

export const Creator: FC = () => (
  <>
    <NavTab tabs={LIST} />
    <Routes>
      <Route
        path="lock/*"
        element={<TradeHashCreate />}
      />
      <Route
        path="engage/*"
        element={<Engage title="Engage(Creator)" />}
      />
      <Route
        path="claim/*"
        element={<Claim title="Claim(Creator)" />}
      />
      <Route
        path="*"
        element={<Navigate to={`/${ROUTES.main.creator.lock}`} />}
      />
    </Routes>
  </>
);
