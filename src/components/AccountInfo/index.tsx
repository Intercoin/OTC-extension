import React, { FC } from 'react';
import cn from 'classnames';
import { useLoadWeb3 } from 'hooks';
import { SelectAccount } from 'containers';
import { WalletAddress } from '../WalletAddress';

import styles from './styles.module.scss';

type Props = {
  className?: string,
};

export const AccountInfo: FC<Props> = ({
  className,
}) => {
  const { account } = useLoadWeb3();

  return (
    <div className={cn(styles.container, className)}>
      <SelectAccount />
      <WalletAddress wallet={account} />
    </div>
  );
};
