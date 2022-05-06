import React, {
  FC, useContext, useMemo, useState,
} from 'react';
import { Banner, Button, Title } from 'components';
import CryptoJS from 'crypto-js';
import { Wallet } from 'ethers';
import { ContextProvider } from 'contexts';
import { ContextProviderT } from 'contexts/types';
import { useInitNetwork } from 'hooks';
import { ButtonWord } from './ButtonWord';

import styles from './styles.module.scss';

type Props = {
  phrase: string,
};

export const ConfirmPhrase: FC<Props> = ({ phrase }) => {
  const { dispatch } = useContext<ContextProviderT>(ContextProvider);

  const [confirmPhrase, setConfirmPhrase] = useState<string[]>([]);
  const [isReset, setIsReset] = useState<boolean>(false);

  function makeRandomArr() {
    return Math.random() - 0.5;
  }

  const phraseSort = useMemo(() => phrase.split(' ').sort(makeRandomArr), [phrase]);

  const handlePushWord = (name: string) => {
    if (confirmPhrase.includes(name)) {
      setConfirmPhrase(confirmPhrase.filter((e) => e !== name));
      return;
    }

    setConfirmPhrase([...confirmPhrase, name]);
  };

  const handleConfirm = async () => {
    const walletMnemonic = Wallet.fromMnemonic(phrase);

    const account = {
      privateKey: walletMnemonic.privateKey,
      publicKey: walletMnemonic.publicKey,
      address: walletMnemonic.address,
      name: 'Account 1',
      created: Date.now(),
    };

    const newAccountList = [account];

    const encryptedAccountList = await CryptoJS.AES.encrypt(JSON.stringify(newAccountList), 'password').toString();

    localStorage.setItem('accountList', encryptedAccountList);

    const selectAccount = {
      name: account.name,
      address: account?.address,
      logo: '',
    };

    localStorage.setItem('selectAccount', JSON.stringify(selectAccount));

    dispatch({ type: 'SET_ACCOUNT_LIST', payload: selectAccount });

    const { networkList, selectNetwork } = useInitNetwork();

    dispatch({
      type: 'SET_NETWORK_LIST',
      payload: networkList,
    });

    dispatch({
      type: 'CHANGE_NET',
      payload: selectNetwork,
    });
  };

  const isDisabled = phrase !== confirmPhrase.join(' ');

  const handleReset = () => {
    setConfirmPhrase([]);
    setIsReset(!isReset);
  };

  const handleSelectWord = async (word: string) => {
    handlePushWord(word);
  };

  return (
    <div className={styles.container}>
      <Title className={styles.title}>
        Confirm phrase
      </Title>

      <Banner text="Please enter your mnemonic phrase in the correct order:" />

      <div className={styles.confirmPhrase}>
        {confirmPhrase.join(' ')}
      </div>

      <div className={styles.buttonContainer}>
        {phraseSort.map((word) => (
          <div key={word} className={styles.buttonWord}>
            <ButtonWord
              isClear={isReset}
              name={word}
              onClick={() => handleSelectWord(word)}
            />
          </div>
        ))}
      </div>

      <div className={styles.buttonWrap}>
        <Button onClick={handleReset} disabled={!confirmPhrase.length}>
          Reset
        </Button>

        <Button
          onClick={handleConfirm}
          disabled={isDisabled}
          className={styles.buttonConfirm}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};
