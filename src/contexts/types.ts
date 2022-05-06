import { Dispatch, ReactNode } from 'react';

export type ProviderT = {
  children: ReactNode,
};

export type ContextProviderT = {
  state: State,
  dispatch: Dispatch<Action>,
};

export type Network = {
  httpProvider: string,
  label: string,
  chainId: number | null,
};

export type Account = {
  logo: string,
  address: string,
  name: string,
};

export type State = {
  selectNetwork: Network,
  selectAccount: Account,
  accountList: Account[],
  networkList: Network[],
};

export enum Payload {
  CHANGE_NET = 'CHANGE_NET',
  SELECTED_ACCOUNT = 'SELECTED_ACCOUNT',
  SET_ACCOUNT_LIST = 'SET_ACCOUNT_LIST',
  SET_NETWORK_LIST = 'SET_NETWORK_LIST',
  INITIAL_STATE = 'INITIAL_STATE',
}

export type Action = {
  type: keyof typeof Payload,
  payload: any,
};
