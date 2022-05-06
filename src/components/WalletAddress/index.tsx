import React, { FC, useState } from 'react';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import cn from 'classnames';

import { ReactComponent as Wallet } from 'assets/images/lending/wallet.svg';
import { ReactComponent as Check } from 'assets/images/lending/check.svg';
import { copyText } from 'utils';

import styles from './styles.module.scss';

type Props = {
  wallet: Web3ReactContextInterface['account'];
  className?: string,
};

export const WalletAddress: FC<Props> = ({ wallet, className }) => {
  const [copyImgStyles, setCopyImgStyles] = useState<boolean>(false);

  const handleCopyText = () => {
    if (!wallet) return;
    copyText(wallet);
    setCopyImgStyles(true);
    setTimeout(() => setCopyImgStyles(false), 1000);
  };

  return (
    <div className={cn(styles.walletWrapper, className)}>
      <span className={styles.wallet}>
        {wallet}
      </span>
      <span className={styles.walletSub}>
        {wallet?.slice(-2)}
      </span>
      <button
        onClick={handleCopyText}
        className={styles.button}
      >
        <Wallet className={cn(styles.walletImg, { [styles.notCopy]: copyImgStyles })} />
        <Check className={cn(styles.checkImg, { [styles.copy]: copyImgStyles })} />
      </button>
    </div>
  );
};
