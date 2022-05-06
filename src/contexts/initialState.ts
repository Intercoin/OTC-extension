import { Dispatch } from 'react';
import CryptoJS from 'crypto-js';
import { useInitNetwork } from 'hooks';
import { Action } from './types';

export const initialState = async (dispatch: Dispatch<Action>) => {
  const { networkList, selectNetwork } = useInitNetwork();

  const selectAccount = localStorage.getItem('selectAccount');
  const selectAccountJSONParse = JSON.parse(selectAccount || '{}');

  const accountList = localStorage.getItem('accountList');
  const decryptedAccountList = await JSON.parse(CryptoJS.AES.decrypt(accountList, 'password').toString(CryptoJS.enc.Utf8));
  const accountListParse = decryptedAccountList.map((account, i) => ({
    name: account.name ? account.name : `Account ${i + 1}`,
    address: account?.address,
    logo: '',
  }));

  const initialState = {
    selectNetwork,
    networkList,
    selectAccount: {
      name: selectAccountJSONParse.name,
      address: selectAccountJSONParse?.address,
      logo: selectAccountJSONParse?.logo,
    },
    accountList: accountListParse,
  };

  dispatch({
    type: 'INITIAL_STATE',
    payload: initialState,
  });

  return { initialState };
};
