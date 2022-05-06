import React, {
  FC, useContext, useEffect, useState,
} from 'react';
import { useFormik } from 'formik';

import {
  Input,
  Button,
  Dropdown,
  Container,
  InputAmount,
} from 'components';
import { useLoadWeb3 } from 'hooks';
import { copyText, currentAccountInfo } from 'utils';
import cn from 'classnames';
import { ReactComponent as Check } from 'assets/images/lending/check.svg';
import { toast } from 'react-toastify';
import { ContextProviderT } from 'contexts/types';
import { ContextProvider } from 'contexts';
import { ModalLock, Approve } from 'containers';
import Web3 from 'web3';
import { validationSchema, initialValues, Values } from './formik-data';
import {
  SWAP_BSC_TESTNET_ADDRESS,
  SWAP_RINKEBY_ADDRESS,
  TOKEN_LIST_DEFAULT,
  TOKEN_LIST_RINKEBY,
  TOKEN_LIST_BSC,
  REGEX,
} from '../../../constants';

import styles from './styles.module.scss';
import { ApproveProps } from '../../Approve/types';

const TOKENS_LIST = {
  4: TOKEN_LIST_RINKEBY,
  97: TOKEN_LIST_BSC,
};

const SWAP_CONTRACTS_LIST = {
  4: SWAP_RINKEBY_ADDRESS,
  97: SWAP_BSC_TESTNET_ADDRESS,
};

const APPROVE_INFO_INIT = {
  acronym: '',
  amount: '',
  fee: '',
  hash: '',
  network: '',
  estimateGas: '',
  data: '',
};

export const TradeHashFollower: FC = () => {
  const { web3, chainId } = useLoadWeb3();
  const { state } = useContext<ContextProviderT>(ContextProvider);

  const [approveModalInfo, setApproveModalInfo] = useState<ApproveProps['infoModal']>(APPROVE_INFO_INIT);
  const [isOpenLockModal, setIsOpenLockModal] = useState<boolean>(false);

  const [copyImgStyles, setCopyImgStyles] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formik = useFormik<Values>({
    initialValues,
    validationSchema,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    onSubmit,
  });

  const {
    methodsERC20,
    methodsSwap,
  } = useLoadWeb3(formik.values.senderToken.value);

  const {
    values: {
      otherParticipantAddress,
      senderToken,
      senderAmount,
      senderPenalty,
      hash,
    },
    handleSubmit,
    setFieldValue,
    handleBlur,
    handleChange,
    resetForm,
    isValid,
    touched,
    errors,
    dirty,
  } = formik;

  useEffect(() => {
    resetForm();
  }, [chainId]);

  const handleCopyTradeHash = () => {
    copyText(hash);
    setCopyImgStyles(true);
    setTimeout(() => setCopyImgStyles(false), 1000);
  };

  async function onSubmit(values, { setSubmitting }) {
    setIsLoading(true);
    try {
      const account = await currentAccountInfo({ address: state.selectAccount.address });
      const allowance = await methodsERC20.allowance(
        account?.address,
        SWAP_CONTRACTS_LIST[chainId || 0],
      ).call();

      if (Web3.utils.toBN(allowance).lt((Web3.utils.toBN(Web3.utils.toWei(senderAmount, 'ether').toString())))) {
        const data = methodsERC20?.approve(SWAP_CONTRACTS_LIST[chainId || 0], Web3.utils.toWei(senderAmount, 'ether'))
          .encodeABI() || '';

        const estimateGas = await web3.eth.estimateGas({
          data,
          from: account.address,
          to: senderToken.value,
        });

        const _approveInfo = {
          acronym: senderToken.label,
          amount: senderAmount,
          fee: '0.10',
          network: state.selectNetwork.label,
          data,
          estimateGas,
          hash,
        };

        setApproveModalInfo(_approveInfo);
        setIsLoading(false);
        return;
      }

      setIsOpenLockModal(true);

      setIsLoading(false);
    } catch (e) {
      console.log(e);
      toast.error('Lock failed');
      setIsLoading(false);
    }

    setSubmitting(false);
  }

  return (
    <>
      <Container
        className={styles.container}
        text=''
        title="Lock(Follower)"
      >
        <form onSubmit={handleSubmit}>
          <h4 className={styles.title}>
            Your token
          </h4>
          <Dropdown
            name="senderToken"
            value={senderToken}
            options={chainId ? TOKENS_LIST[chainId] : TOKEN_LIST_DEFAULT}
            className={styles.dropdown}
            onChange={(e) => {
              setFieldValue('senderToken', e);
            }}
            onBlur={handleBlur}
            error={!!touched?.senderToken?.value && !!errors?.senderToken?.value}
          />

          <div className={styles.inputWrapper}>
            <InputAmount
              name="senderAmount"
              onChange={handleChange}
              value={senderAmount}
              placeholder="Your Amount"
              onBlur={handleBlur}
              error={touched?.senderAmount && errors?.senderAmount}
            />
          </div>

          <div className={cn(styles.inputWrapper, styles.mb)}>
            <InputAmount
              name="senderPenalty"
              onChange={handleChange}
              value={senderPenalty}
              placeholder="Your Penalty"
              onBlur={handleBlur}
              error={touched?.senderPenalty && errors?.senderPenalty}
            />
          </div>

          <div className={styles.inputWrapper}>
            <Input
              name="otherParticipantAddress"
              onChange={(e) => {
                setFieldValue('otherParticipantAddress', e.target.value.replace(REGEX.onlyLettersAndNumbers, ''));
              }}
              value={otherParticipantAddress}
              placeholder="Other participant address"
              onBlur={handleBlur}
              error={touched?.otherParticipantAddress && errors?.otherParticipantAddress}
            />
          </div>

          <div className={styles.inputWrapper}>
            <Input
              name="hash"
              value={hash}
              placeholder="Trade hash"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched?.hash && errors?.hash}
            />

            <Button
              className={styles.button}
              onClick={handleCopyTradeHash}
              disabled={!hash}
            >

              <div className={cn(styles.copyText, { [styles.notCopy]: copyImgStyles })}>
                Copy
              </div>

              <Check className={cn(styles.checkImg, { [styles.copy]: copyImgStyles })} />

            </Button>
          </div>

          <Button
            type="submit"
            disabled={!dirty || !isValid}
            isLoading={isLoading}
          >
            Lock
          </Button>
        </form>

      </Container>

      <ModalLock
        infoLock={{
          methodsSwap,
          addressSwap: SWAP_CONTRACTS_LIST[chainId || 0],
          amount: senderAmount,
          web3,
          address: state.selectAccount.address,

          otherParticipantAddress,
          senderPenalty,
          senderTokenAddress: senderToken.value,
          hash,
        }}
        isOpen={isOpenLockModal}
        setOpen={setIsOpenLockModal}
      />

      <Approve
        nextFunc={() => setIsOpenLockModal(true)}
        infoModal={approveModalInfo}
        infoApprove={{
          methodsERC20,
          addressSwap: SWAP_CONTRACTS_LIST[chainId || 0],
          tokenAddress: senderToken?.value,
          amount: senderAmount,
          web3,
          address: state.selectAccount.address,
        }}
        isOpen={!!approveModalInfo.fee}
        setOpen={() => setApproveModalInfo(APPROVE_INFO_INIT)}
      />
    </>
  );
};
