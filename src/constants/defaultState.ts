import { State } from 'contexts/types';
import { networkListDefault } from './networkListDefault';

export const defaultState: State = {
  selectNetwork: {
    chainId: null,
    httpProvider: '',
    label: '',
  },
  selectAccount: {
    name: '',
    address: '',
    logo: '',
  },
  accountList: [{
    name: '',
    address: '',
    logo: '',
  }],
  networkList: networkListDefault,
};
