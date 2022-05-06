import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { NavTab } from 'components';
import { TradeHashFollower } from './TradeHashFollower';
import { ROUTES } from '../../constants';
import { Engage } from '../Engage';
import { Claim } from '../Claim';

const LIST = [
  {
    name: 'Lock',
    to: ROUTES.main.follower.lock,
    status: true,
  },
  {
    name: 'Engage',
    to: ROUTES.main.follower.engage,
    status: true,
  },
  {
    name: 'Claim',
    to: `${ROUTES.main.follower.claim}`,
    status: false,
  },
];

export const Follower: FC = () => (
  <>
    <NavTab tabs={LIST} />
    <Routes>
      <Route
        path="lock/*"
        element={<TradeHashFollower />}
      />
      <Route
        path="engage/*"
        element={<Engage title="Engage(Follower)" />}
      />
      <Route
        path="claim/*"
        element={<Claim title="Claim(Follower)" />}
      />
      <Route
        path="*"
        element={<Navigate to={`/${ROUTES.main.follower.lock}`} />}
      />
    </Routes>
  </>
);
