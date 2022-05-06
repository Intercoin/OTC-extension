import { State, Action } from './types';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'CHANGE_NET':
      return {
        ...state,
        selectNetwork: {
          chainId: action?.payload?.chainId,
          httpProvider: action?.payload?.httpProvider || '',
          label: action?.payload?.label || '',
        },
      };

    case 'SELECTED_ACCOUNT':
      return {
        ...state,
        selectAccount: {
          name: action?.payload?.name,
          address: action?.payload?.address,
          logo: action?.payload?.logo,
        },
      };

    case 'SET_ACCOUNT_LIST':
      return {
        ...state,
        accountList: action.payload,
      };

    case 'SET_NETWORK_LIST':
      return {
        ...state,
        networkList: action.payload,
      };

    case 'INITIAL_STATE':
      return action.payload;

    default:
      return state;
  }
};
