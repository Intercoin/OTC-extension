import {
  useReducer,
  createContext,
} from 'react';

import {
  ProviderT,
  ContextProviderT,
} from './types';

import { reducer } from './reducer';
import { defaultState } from '../constants';

export const ContextProvider = createContext<ContextProviderT>({
  state: defaultState,
  dispatch: () => null,
});

export const Provider = ({ children }: ProviderT) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <ContextProvider.Provider value={{ state, dispatch }}>
      {children}
    </ContextProvider.Provider>
  );
};
