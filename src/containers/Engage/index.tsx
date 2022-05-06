import React, {
  FC, useState, useCallback, useContext,
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
import { toast } from 'react-toastify';
import { ContextProviderT } from 'contexts/types';
import { ContextProvider } from 'contexts';
import { initialValues, validationSchema, Values } from './formik-data';

import styles from './styles.module.scss';
import { SWAP_BSC_TESTNET_ADDRESS, SWAP_RINKEBY_ADDRESS } from '../../constants';
import { ModalSign } from '../ModalSign';
import { ModalEngage } from '../ModalEngage';

type Props = {
  nextScreenRoute?: string,
  title?: string,
};

const SWAP_CONTRACTS_LIST = {
  4: SWAP_RINKEBY_ADDRESS,
  97: SWAP_BSC_TESTNET_ADDRESS,
};

export const Engage: FC<Props> = ({
  // nextScreenRoute,
  title,
}) => {
  const {
    methodsSwap, web3, chainId,
  } = useLoadWeb3();
  const { state } = useContext<ContextProviderT>(ContextProvider);
  const navigate = useNavigate();

  const [isOpenSignModal, setIsOpenSignModal] = useState<boolean>(false);
  const [isOpenEngageModal, setIsOpenEngageModal] = useState<boolean>(false);
  const [signedMsg, setSignedMsg] = useState<any>(null);

  const { search, pathname } = useLocation();

  const queryParams = parseQueryString(search);

  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    },
    handleSubmit,
    handleBlur,
    handleChange,
    isValid,
    touched,
    errors,
  } = formik;

  async function onSubmit() {
    setIsLoading(true);
    try {
      setIsOpenSignModal(true);
      setIsLoading(false);
    } catch (e) {
      toast.error('Engage failed');
      setIsLoading(false);
      console.log(e);
    }
  }

  const handleValuesChange = useCallback((values: string) => {
    navigate({
      pathname,
      search: queryString({ tradeHash: values }),
    });
  }, [search]);

  return (
    <>
      <Container
        className={styles.container}
        text=''
        title={title || ''}
      >
        <Banner text="Attention: Engage must be called from other participant’s network" />

        <form onSubmit={handleSubmit}>
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
              disabled={!isValid}
              className={styles.button}
            >
              Engage
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
        nextFunc={() => setIsOpenEngageModal(true)}
      />

      <ModalEngage
        infoEngage={{
          methodsSwap,
          web3,
          hash,
          addressSwap: SWAP_CONTRACTS_LIST[chainId || 0],
          address: state.selectAccount.address,
          signedMsg,
        }}
        isOpen={isOpenEngageModal}
        setOpen={setIsOpenEngageModal}
      />
    </>
  );
};
