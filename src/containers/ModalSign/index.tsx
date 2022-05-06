import React, { FC, useEffect, useState } from 'react';

import { Button, Loader, Modal } from 'components';

import { useLoadWeb3 } from 'hooks';
import Web3 from 'web3';
import { currentAccountInfo } from 'utils';
import { toast } from 'react-toastify';
import { ModalSignProps } from './types';

import styles from './styles.module.scss';

export const ModalSign: FC<ModalSignProps> = ({
  setOpen,
  infoModal,
  isOpen,
  setSignedMsg,
  nextFunc,
}) => {
  const { web3, chainId, account: address } = useLoadWeb3();
  const [balance, setBalance] = useState<number>(0);
  const [isLoaderBalance, setIsLoaderBalance] = useState<boolean>(false);
  const [isLoaderSign, setIsLoaderSign] = useState<boolean>(false);

  const getBalance = async () => {
    setIsLoaderBalance(true);
    try {
      const _balance = await web3.eth.getBalance(address);

      setBalance(+(Web3.utils.fromWei(_balance)));
      setIsLoaderBalance(false);
    } catch (e) {
      console.log(e);
      setBalance(0);
    }
  };

  useEffect(() => {
    getBalance();
  }, [address, isOpen]);

  const handleSign = async () => {
    const account = await currentAccountInfo({ address });

    try {
      setIsLoaderSign(true);

      const signedMsg = await web3.eth.accounts.sign(
        `0x${infoModal.hash}`,
        account.privateKey,
      );

      await setSignedMsg(signedMsg);

      await setIsLoaderSign(false);
    } catch (e) {
      toast.error('signedMsg reject');
      setIsLoaderSign(false);
      console.log(e);
    }
  };

  return (
    <Modal isOpen={isOpen}>
      <div className={styles.container}>
        <div className={styles.title}>
          Your signature is being requested
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

          <div className={styles.myAccount}>
            <div className={styles.accountInfo}>
              <div>
                ADDRESS
              </div>
              <div className={styles.personInfoWrap}>
                <span className={styles.personInfo}>
                  {address}
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

        <div className={styles.subtitle}>
          Your are signing:
        </div>

        <div className={styles.account}>
          <div className={styles.subtitle}>
            Message:
          </div>

          <div className={styles.messageWrap}>
            <span className={styles.message}>
              {infoModal.hash}
            </span>
          </div>
        </div>

        <div className={styles.buttonWrap}>
          <Button className={styles.button} onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button isLoading={isLoaderSign} onClick={async () => {
            await handleSign();
            await setOpen(false);
            await nextFunc();
          }}>
            Sign
          </Button>
        </div>
      </div>
    </Modal>
  );
};
