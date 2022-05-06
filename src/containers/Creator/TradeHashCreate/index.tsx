import React, {
  FC, useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import {
  Input,
  Button,
  Dropdown,
  Container,
  InputAmount,
} from 'components';
import {
  useLoadWeb3, useTradeHash,
} from 'hooks';
import {
  copyText, currentAccountInfo,
  defineNetwork,
} from 'utils';
import cn from 'classnames';
import { ReactComponent as Check } from 'assets/images/lending/check.svg';
import { ContextProviderT } from 'contexts/types';
import { ContextProvider } from 'contexts';
import { Approve, ModalLock } from 'containers';
import { ApproveProps } from 'containers/Approve/types';
import Web3 from 'web3';
import { validationSchema, initialValues, Values } from './formik-data';
import {
  SWAP_BSC_TESTNET_ADDRESS,
  SWAP_RINKEBY_ADDRESS,
  TOKEN_LIST_DEFAULT,
  TOKEN_LIST_RINKEBY,
  TOKEN_LIST_BSC,
  REGEX, RIN_MT_RINKEBY_TESTNET_ADDRESS,
} from '../../../constants';

import styles from './styles.module.scss';

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

export const TradeHashCreate: FC = () => {
  const { web3, chainId } = useLoadWeb3();
  const { state } = useContext<ContextProviderT>(ContextProvider);

  const [approveModalInfo, setApproveModalInfo] = useState<ApproveProps['infoModal']>(APPROVE_INFO_INIT);
  const [isOpenLockModal, setIsOpenLockModal] = useState<boolean>(false);

  const networkList = useMemo(() => state.networkList.map((network) => ({
    value: {
      name: network.label,
      chainId: network.chainId,
    },
    label: network.label,
  })), [state.selectNetwork]);

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
  } = useLoadWeb3(RIN_MT_RINKEBY_TESTNET_ADDRESS);

  const {
    values: {
      otherParticipantNetwork,
      otherParticipantToken,
      otherParticipantAddress,
      otherParticipantAmount,
      otherParticipantPenalty,
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

  const handleGeneratingTradeHash = async () => {
    const { networkName } = defineNetwork(chainId);

    const { tradeHash } = useTradeHash({
      senderChainId: chainId,
      otherParticipantChainId: otherParticipantNetwork?.value?.chainId,

      senderNetwork: networkName,
      otherParticipantNetwork: otherParticipantNetwork?.value?.name,

      senderAddress: web3.account || '',
      otherParticipantAddress,

      senderAmount,
      otherParticipantAmount,

      senderToken: senderToken.value,
      otherParticipantToken: otherParticipantToken.value,

      senderPenalty,
      otherParticipantPenalty,
    });

    await setFieldValue('hash', tradeHash);
  };

  /** handleCopyTradeHash function
   in order to pass it on to the other party
   */
  const handleCopyTradeHash = () => {
    copyText(hash);
    setCopyImgStyles(true);
    setTimeout(() => setCopyImgStyles(false), 1000);
  };

  const disabledGeneratingTradeHash = useMemo(() => (
    !dirty ||
    !!errors?.otherParticipantAddress ||
    !!errors?.otherParticipantNetwork?.value ||
      !!errors?.otherParticipantToken?.value ||
      !!errors?.otherParticipantAmount ||
      !!errors?.otherParticipantPenalty ||
      !!errors?.senderToken?.value ||
      !!errors?.senderAmount ||
      !!errors?.senderPenalty
  ), [errors, dirty]);

  return (
    <>
      <Container
        className={styles.container}
        text=''
        title="Lock(Creator)"
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

          <h4 className={styles.title}>
            Other participant network
          </h4>
          <Dropdown
            value={otherParticipantNetwork}
            name='otherParticipantNetwork'
            options={networkList}
            className={styles.dropdown}
            onChange={(e) => {
              setFieldValue('otherParticipantNetwork', e);
              setFieldValue('otherParticipantToken', { value: '', label: 'Select the asset' });
            }}
            onBlur={handleBlur}
            error={!!touched?.otherParticipantNetwork?.value && !!errors?.otherParticipantNetwork?.value}
          />

          <h4 className={styles.title}>
            Other participant token
          </h4>
          <Dropdown
            name="otherParticipantToken"
            value={otherParticipantToken}
            options={otherParticipantNetwork?.value?.chainId ?
              TOKENS_LIST[otherParticipantNetwork?.value?.chainId] : TOKEN_LIST_DEFAULT}
            className={styles.dropdown}
            onChange={(e) => {
              setFieldValue('otherParticipantToken', e);
            }}
            onBlur={handleBlur}
            error={!!touched?.otherParticipantToken?.value && !!errors?.otherParticipantToken?.value}
          />

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
            <InputAmount
              name="otherParticipantAmount"
              onChange={handleChange}
              value={otherParticipantAmount}
              placeholder="Other participant amount"
              onBlur={handleBlur}
              error={touched?.otherParticipantAmount && errors?.otherParticipantAmount}
            />
          </div>

          <div className={styles.inputWrapper}>
            <InputAmount
              name="otherParticipantPenalty"
              onChange={handleChange}
              value={otherParticipantPenalty}
              placeholder="Other participant penalty"
              onBlur={handleBlur}
              error={touched?.otherParticipantPenalty && errors?.otherParticipantPenalty}
            />
          </div>

          <Button
            className={styles.mb}
            onClick={() => handleGeneratingTradeHash()}
            disabled={disabledGeneratingTradeHash}
          >
            Generate
          </Button>

          <div className={styles.inputWrapper}>
            <Input
              name="hash"
              disabled
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
