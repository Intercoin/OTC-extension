import { Dispatch } from 'react';
import { Action } from 'contexts/types';
import { Wallet } from 'ethers';
import CryptoJS from 'crypto-js';

type Props = {
  privateKey: string,
  name: string,
  dispatch: Dispatch<Action>,
};

export const handleAccount = async ({ privateKey, name, dispatch }: Props) => {
  const walletPrivateKey = new Wallet(privateKey);

  const account = {
    privateKey: walletPrivateKey.privateKey,
    publicKey: walletPrivateKey.publicKey,
    address: walletPrivateKey.address,
    name,
    created: Date.now(),
  };

  const newAccountList = [account];

  const encryptedAccountList = await CryptoJS.AES.encrypt(JSON.stringify(newAccountList), 'password').toString();

  localStorage.setItem('accountList', encryptedAccountList);

  const accountListParse = newAccountList.map((account, i) => ({
    name: account.name ? account.name : `Account ${i + 1}`,
    address: account?.address,
    logo: '',
  }));

  dispatch({ type: 'SET_ACCOUNT_LIST', payload: accountListParse });

  const selectAccount = {
    name,
    address: walletPrivateKey.address,
    logo: '',
  };

  dispatch({
    type: 'SELECTED_ACCOUNT',
    payload: selectAccount,
  });

  localStorage.setItem('selectAccount', JSON.stringify(selectAccount));
};
