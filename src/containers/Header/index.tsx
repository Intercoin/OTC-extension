/* eslint-disable */
import React, { FC } from 'react';
import cn from 'classnames';
import { SelectNetwork } from 'containers';
import { AccountInfo, LogoMenu } from 'components';
import CryptoJS from 'crypto-js';
import { Wallet } from 'ethers';
import { ROUTES } from '../../constants';

import styles from './styles.module.scss';

type Props = {
  className?: string,
};

export const Header: FC<Props> = ({ className }) => {
  // const s = async () => {
  //   const walletMnemonic1 =
  //     Wallet.fromMnemonic('myself suit arrest original second category saddle entry scene wasp sibling cousin');
  //
  //   const walletMnemonic2 =
  //     Wallet.fromMnemonic('forget primary tool traffic stool zero point spell habit repair chapter join');
  //
  //   const obj = {
  //     privateKey: walletMnemonic1.privateKey,
  //     publicKey: walletMnemonic1.publicKey,
  //     address: walletMnemonic1.address,
  //     created: new Date(),
  //     name: 'Account 1',
  //   };
  //
  //   const payload = {
  //     logo: '',
  //     address: walletMnemonic1.address,
  //     name: 'Account 2',
  //   };
  //
  //   const obj1 = {
  //     privateKey: walletMnemonic2.privateKey,
  //     publicKey: walletMnemonic2.publicKey,
  //     address: walletMnemonic2.address,
  //     name: '',
  //     created: new Date(),
  //   };
  //
  //   const encrypted = await CryptoJS.AES.encrypt(JSON.stringify([obj, obj1]), 'password').toString();
  //
  //   localStorage.setItem('accountList', encrypted);
  // };

  return (
    <div className={cn(styles.container, className)}>
      {/*<button onClick={s}>*/}
      {/*  232323*/}
      {/*</button>*/}
      <div className={styles.ddWrap}>
        <SelectNetwork />

        <LogoMenu />
      </div>

      <AccountInfo />
    </div>
  );
};
