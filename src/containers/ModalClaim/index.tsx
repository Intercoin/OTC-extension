import React, { FC, useEffect, useState } from 'react';

import { Button, Loader, Modal } from 'components';
import { useClaim, useLoadWeb3 } from 'hooks';
import Web3 from 'web3';
import cn from 'classnames';
import styles from './styles.module.scss';
import { ModalClaimProps } from './types';

export const ModalClaim: FC<ModalClaimProps> = ({ infoClaim, isOpen, setOpen }) => {
  const { chainId, web3, account } = useLoadWeb3();
  const [balance, setBalance] = useState<number>(0);
  const [isLoaderBalance, setIsLoaderBalance] = useState<boolean>(false);

  const { claim, isLoading } = useClaim({
    methodsSwap: infoClaim.methodsSwap,
    web3,
    hash: infoClaim.hash,
    addressSwap: infoClaim.addressSwap,
    address: infoClaim.address,
    signedMsg: infoClaim.signedMsg,
    signature: infoClaim.signature,
  });

  const getBalance = async () => {
    setIsLoaderBalance(true);
    try {
      const _balance = await web3.eth.getBalance(account);

      setBalance(+(Web3.utils.fromWei(_balance)));
      setIsLoaderBalance(false);
    } catch (e) {
      console.log(e);
      setBalance(0);
    }
  };

  useEffect(() => {
    getBalance();
  }, [account, isOpen]);

  return (
    <Modal isOpen={isOpen}>
      <div className={styles.container}>
        <div className={styles.title}>
          Call function claim
        </div>

        <div className={styles.accountWrap}>

          <div className={styles.logoWrap}>
            <div className={styles.avatarWrap}>
              <div className={styles.avatar}>
                OTC
              </div>
            </div>

            <div className={styles.name}>
              Acc
            </div>
          </div>

          <div className={styles.account}>
            <div className={styles.accountInfo}>
              <div>
                ADDRESS
              </div>
              <div className={styles.personInfoWrap}>
                <span className={styles.personInfo}>
                  {infoClaim.address}
                </span>
              </div>
            </div>

            <div className={styles.accountInfo}>
              <div>
                BALANCE
              </div>
              {
                isLoaderBalance ? <Loader /> : (
                  <div>
                    {balance.toFixed(4)}
                    {' '}
                    {chainId === 97 ? 'BNB' : 'ETH'}
                  </div>
                )
              }
            </div>
          </div>

        </div>

        <div className={cn(styles.accountInfo, styles.wrap)}>
          <div>
            Contract:
          </div>
          <div className={cn(styles.personInfoWrap, styles.contract)}>
            <span className={styles.personInfo}>
              {infoClaim.addressSwap}
            </span>
          </div>
        </div>

        <div className={styles.infoWrap}>
          <h3 className={styles.subtitle}>
            Information
          </h3>

          <div className={styles.toInfo}>
            <div className={styles.person}>
              <div>
                Trade hash:
              </div>

              <div className={styles.personInfoWrap}>
                <span className={styles.personInfo}>
                  {infoClaim.hash}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.toInfo}>
            <div className={styles.person}>
              <div>
                Signature:
              </div>

              <div className={styles.personInfoWrap}>
                <span className={styles.personInfo}>
                  {infoClaim.signature}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.buttonWrap}>
          <Button className={styles.button} onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button isLoading={isLoading} onClick={async () => {
            await claim();
            await setOpen(false);
          }}>
            Claim
          </Button>
        </div>
      </div>
    </Modal>
  );
};
