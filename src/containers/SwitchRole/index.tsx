import React, { FC, useEffect, useState } from 'react';
import {
  Link,
} from 'react-router-dom';
import bnb from 'assets/image/bnb.png';
import eth from 'assets/image/eth.jpeg';

import {
  Container,
  Loader,
} from 'components';
import { useLoadWeb3 } from 'hooks';
import Web3 from 'web3';
import { toast } from 'react-toastify';
import { ROUTES } from '../../constants';

import styles from './styles.module.scss';

export const SwitchRole: FC = () => {
  const { chainId, web3, account } = useLoadWeb3();
  const [acronym, setAcronym] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleInfo = async () => {
    if (!account) return;
    try {
      setLoading(true);
      setAcronym(chainId === 97 ? 'BNB' : 'ETH');
      const _balance = await web3.eth.getBalance(account);
      const balanceConvert = +(Web3.utils.fromWei(_balance));

      setBalance(balanceConvert.toFixed(4));
      setLoading(false);
    } catch (e) {
      toast.error('Reject balance');
      setLoading(false);
      setBalance('0.00');
      setAcronym('');
      console.log(e);
    }
  };

  useEffect(() => {
    handleInfo();
  }, [chainId, account]);

  const currencyLogo = chainId === 97 ?
    <img src={bnb} alt="bnb" className={styles.logoBnb} /> : <img src={eth} alt="eth" className={styles.logoEth} />;

  return (
    <Container
      text=''
      title=''
    >
      <div className={styles.container}>
        <Link to={ROUTES.main.creator.lock}>
          Creator
        </Link>

        <Link to={ROUTES.main.follower.lock}>
          Follower
        </Link>
      </div>

      <div className={styles.info}>
        <div className={styles.currencyLogo}>
          {currencyLogo}
        </div>
        <div className={styles.balance}>
          {isLoading ? <Loader className={styles.loader} /> : `${balance}${acronym}`}
        </div>
      </div>
    </Container>
  );
};
