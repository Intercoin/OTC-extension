import React, { FC, useEffect, useState } from 'react';

import { Button, Loader, Modal } from 'components';

import cn from 'classnames';
import { useApprove, useLoadWeb3 } from 'hooks';
import Web3 from 'web3';
import { getGasPrice } from 'utils';
import { ApproveProps } from './types';

import styles from './styles.module.scss';

export const Approve: FC<ApproveProps> = ({
  infoModal,
  setOpen,
  isOpen,
  infoApprove,
  nextFunc,
}) => {
  const { web3, chainId } = useLoadWeb3();

  const [gasPrice, setGasPrice] = useState<number>(0);
  const [isLoadingGas, setIsLoadingGas] = useState<boolean>(false);

  const { approve, isLoading } = useApprove({
    methodsERC20: infoApprove.methodsERC20,
    addressSwap: infoApprove.addressSwap,
    tokenAddress: infoApprove.tokenAddress,
    amount: infoApprove.amount,
    web3: infoApprove.web3,
    address: infoApprove.address,
    estimateGas: infoModal.estimateGas,
  });

  useEffect(() => {
    getGasPrice({
      setGasPrice,
      setIsLoadingGas,
      web3,
      estimateGas: infoModal.estimateGas,
    });
  }, [chainId, isOpen]);

  return (
    <Modal isOpen={isOpen}>
      <div className={styles.container}>
        <div className={styles.title}>
          {`Allow access to your ${infoModal.acronym}?`}
        </div>

        <div className={cn(styles.text, styles.subtext)}>
          {` Do you trust this site? By granting this
          permission, you're allowing Localhost to
          withdraw your ${infoModal.acronym} and automate transactions
          for you.`}
        </div>

        <div className={styles.network}>
          {`Network: ${infoModal.network}`}
        </div>

        <div className={styles.account}>
          <div className={styles.subtitle}>
            Transaction fee
          </div>
          <div className={styles.accountInfo}>
            <div className={styles.accountInfoText}>
              A fee is associated with this request
            </div>

            {
              isLoadingGas ? <Loader /> : (
                <div className={styles.value}>
                  {`${gasPrice}`}
                  {' '}
                  {chainId === 97 ? 'BNB' : 'ETH'}
                </div>
              )
            }
          </div>
        </div>

        <div className={styles.account}>
          <div className={styles.subtitle}>
            Authorization Request
          </div>
          <div className={styles.accountInfo}>
            <div className={styles.accountInfoText}>
              Approved amount:
            </div>
            <div className={styles.value}>
              {`${Web3.utils.toWei(infoModal.amount || '0', 'ether')}`}
            </div>
          </div>

          <div className={styles.accountInfo}>
            <div className={styles.accountInfoText}>
              Granted to:
            </div>
            <div className={styles.value}>
              Contract:
              <div className={styles.personInfoWrap}>
                <span className={styles.personInfo}>
                  {infoApprove.addressSwap}
                </span>
                <span className={styles.personInfoSub}>
                  {infoApprove.addressSwap?.slice(-2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.account}>
          <div className={styles.subtitle}>
            Data
          </div>

          <div className={styles.text}>
            Function: Approve
          </div>

          <div className={styles.text}>
            {infoModal.data}
          </div>

        </div>

        <div className={styles.buttonWrap}>
          <Button className={styles.button} onClick={() => setOpen(false)}>
            Decline
          </Button>

          <Button
            isLoading={isLoading}
            onClick={async () => {
              await approve();
              await setOpen(false);
              await nextFunc();
            }}
          >
            Approve
          </Button>
        </div>
      </div>
    </Modal>
  );
};
