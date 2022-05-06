import React, {
  FC, useState,
  useContext,
} from 'react';
import { ContextProvider } from 'contexts';
import { ContextProviderT } from 'contexts/types';
import { useFormik } from 'formik';
import {
  Button,
  Input,
  Container,
  Banner,
} from 'components';
import { Wallet } from 'ethers';
import CryptoJS from 'crypto-js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { initialValues, validationSchema, Values } from './formik-data';

import styles from './styles.module.scss';
import { ROUTES } from '../../constants';

export const ImportAccount: FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext<ContextProviderT>(ContextProvider);
  const [bannerText, setBannerText] = useState<string>('');

  const formik = useFormik<Values>({
    initialValues,
    validationSchema,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    onSubmit,
  });

  const {
    values: {
      privateKey,
      name,
    },
    handleSubmit,
    handleBlur,
    handleChange,
    isValid,
    dirty,
    touched,
    errors,
  } = formik;

  async function onSubmit(values: Values, { setSubmitting }) {
    const accountList = localStorage.getItem('accountList');
    const decryptedAccountList = await JSON.parse(CryptoJS.AES.decrypt(accountList, 'password').toString(CryptoJS.enc.Utf8));

    if (values.privateKey.length % 2) {
      setBannerText('Expected private key to be an Uint8Array with length 32');
      return;
    }

    const hex = await Uint8Array.from(Buffer.from(values.privateKey.replace('0x', ''), 'hex'));

    if (hex.length !== 32) {
      setBannerText('Expected private key to be an Uint8Array with length 32');
    }

    const walletPrivateKey = new Wallet(values.privateKey);

    const accountListSearch = decryptedAccountList.filter((account) => account.privateKey === values.privateKey);

    if (!(values.privateKey.indexOf('0x') + 1)) {
      setBannerText('Cannot convert string to buffer. toBuffer only' +
        ' supports 0x-prefixed hex strings and this string was given: 0xew');
      return;
    }

    if (accountListSearch.length === decryptedAccountList.length) {
      setBannerText('This account already exists');
      return;
    }

    const account = {
      privateKey: walletPrivateKey.privateKey,
      publicKey: walletPrivateKey.publicKey,
      address: walletPrivateKey.address,
      name,
      created: Date.now(),
    };

    const newAccountList = [...decryptedAccountList, account];

    const encryptedAccountList = await CryptoJS.AES.encrypt(JSON.stringify(newAccountList), 'password').toString();

    localStorage.setItem('accountList', encryptedAccountList);

    const accountListParse = newAccountList.map((account, i) => ({
      name: account.name ? account.name : `Account ${i + 1}`,
      address: account?.address,
      logo: '',
    }));

    dispatch({ type: 'SET_ACCOUNT_LIST', payload: accountListParse });

    const selectAccount = {
      name,
      address: walletPrivateKey.address,
      logo: '',
    };

    dispatch({
      type: 'SELECTED_ACCOUNT',
      payload: selectAccount,
    });

    localStorage.setItem('selectAccount', JSON.stringify(selectAccount));

    toast.success('Import account successfully');

    navigate({
      pathname: `main/${ROUTES.main.switchRole}`,
    });

    setSubmitting(false);
  }

  return (
    <Container
      text=''
      title="Import Account"
    >
      {bannerText ? <Banner text={bannerText} onClose={() => setBannerText('')} /> : null}
      <form onSubmit={handleSubmit}>
        <h4>
          Name account
        </h4>
        <Input
          name="name"
          value={name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched?.name && errors?.name}
        />

        <h4>
          Private key
        </h4>
        <Input
          name="privateKey"
          value={privateKey}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched?.privateKey && errors?.privateKey}
        />

        <Button
          type="submit"
          disabled={!dirty || !isValid}
          className={styles.button}
        >
          Import
        </Button>
      </form>
    </Container>
  );
};
