import CryptoJS from 'crypto-js';

type Props = {
  address: string,
};

type Account = {
  privateKey: string,
  publicKey: string,
  address: string,
  created: string,
  name: string,
};

export const currentAccountInfo = async ({ address }: Props): Promise<Account> => {
  const accountList = localStorage.getItem('accountList');

  const decryptedAccountList = await JSON.parse(CryptoJS.AES.decrypt(accountList, 'password').toString(CryptoJS.enc.Utf8));

  const accountListFilter = decryptedAccountList?.filter((acc) => acc.address === address);

  return accountListFilter[0];
};
