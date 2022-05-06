import React, {
  FC, useCallback, useContext, useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  Input,
  Button,
  Container,
  Banner,
} from 'components';
import { useFormik } from 'formik';
import { useLoadWeb3 } from 'hooks';
import { parseQueryString, queryString } from 'utils';
import cn from 'classnames';
import { toast } from 'react-toastify';
import { ContextProviderT } from 'contexts/types';
import { ContextProvider } from 'contexts';
import { initialValues, validationSchema, Values } from './formik-data';
import { SWAP_BSC_TESTNET_ADDRESS, SWAP_RINKEBY_ADDRESS } from '../../constants';

import styles from './styles.module.scss';
import { ModalSign } from '../ModalSign';
import { ModalClaim } from '../ModalClaim';

type Props = {
  title?: string,
};

const SWAP_CONTRACTS_LIST = {
  4: SWAP_RINKEBY_ADDRESS,
  97: SWAP_BSC_TESTNET_ADDRESS,
};

export const Claim: FC<Props> = ({ title }) => {
  const { state } = useContext<ContextProviderT>(ContextProvider);
  const { web3, chainId } = useLoadWeb3();
  const { methodsSwap } = useLoadWeb3();
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const queryParams = parseQueryString(search);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [signedMsg, setSignedMsg] = useState<any>(null);

  const [isOpenSignModal, setIsOpenSignModal] = useState<boolean>(false);
  const [isOpenClaimModal, setIsOpenClaimModal] = useState<boolean>(false);

  const formik = useFormik<Values>({
    initialValues: {
      ...initialValues,
      hash: queryParams?.tradeHash || '',
    },
    validationSchema,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    onSubmit,
  });

  const {
    values: {
      hash,
      signature,
    },
    handleSubmit,
    handleBlur,
    handleChange,
    isValid,
    touched,
    errors,
    dirty,
  } = formik;

  async function onSubmit() {
    try {
      setIsLoading(true);

      setIsOpenSignModal(true);
      setIsLoading(false);
    } catch (e) {
      toast.error('Claim failed');
      setIsLoading(false);
      console.log(e);
    }
  }

  const handleValuesChange = useCallback((values: string) => {
    navigate({
      pathname,
      search: queryString({
        ...queryParams,
        tradeHash: values,
      }),
    });
  }, [search]);

  return (
    <>
      <Container
        className={styles.container}
        text=''
        title={title || ''}
      >
        <Banner text="Attention: Claim must be called from other participant’s network" />

        <form onSubmit={handleSubmit}>
          <h4 className={styles.title}>
            Signature
          </h4>
          <div className={cn(styles.inputWrapper, styles.mb)}>
            <Input
              name="signature"
              onChange={handleChange}
              value={signature}
              placeholder="Signature"
              error={touched?.signature && errors?.signature}
              onBlur={handleBlur}
            />
          </div>

          <h4 className={styles.title}>
            Trade hash
          </h4>
          <div className={styles.inputWrapper}>
            <Input
              name="hash"
              onChange={(e) => {
                handleChange(e);
                handleValuesChange(e.target.value);
              }}
              value={hash}
              placeholder="Trade hash"
              error={touched?.hash && errors?.hash}
              onBlur={handleBlur}
            />

            <Button
              type="submit"
              isLoading={isLoading}
              disabled={!dirty || !isValid}
              className={styles.button}
            >
              Claim
            </Button>
          </div>
        </form>
      </Container>

      <ModalSign
        infoModal={{
          hash,
        }}
        setSignedMsg={setSignedMsg}
        isOpen={isOpenSignModal}
        setOpen={setIsOpenSignModal}
        nextFunc={() => setIsOpenClaimModal(true)}
      />

      <ModalClaim
        infoClaim={{
          methodsSwap,
          web3,
          hash,
          addressSwap: SWAP_CONTRACTS_LIST[chainId || 0],
          address: state.selectAccount.address,
          signedMsg,
          signature,
        }}
        isOpen={isOpenClaimModal}
        setOpen={setIsOpenClaimModal}
      />
    </>
  );
};
