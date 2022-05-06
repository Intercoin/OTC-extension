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
  Banner, Title,
} from 'components';
import { toast } from 'react-toastify';
import { useInitNetwork } from 'hooks';
import { initialValues, validationSchema, Values } from './formik-data';
import { handleAccount } from './handleAccount';

import styles from './styles.module.scss';

export const ImportAccount: FC = () => {
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
    if (values.privateKey.length % 2) {
      setBannerText('Expected private key to be an Uint8Array with length 32');
      return;
    }

    const hex = await Uint8Array.from(Buffer.from(values.privateKey.replace('0x', ''), 'hex'));

    if (hex.length !== 32) {
      setBannerText('Expected private key to be an Uint8Array with length 32');
    }

    if (!(values.privateKey.indexOf('0x') + 1)) {
      setBannerText('Cannot convert string to buffer. toBuffer only' +
        ' supports 0x-prefixed hex strings and this string was given: 0xew');
      return;
    }

    await handleAccount({
      privateKey,
      name,
      dispatch,
    });

    const { networkList, selectNetwork } = useInitNetwork();

    dispatch({
      type: 'SET_NETWORK_LIST',
      payload: networkList,
    });

    dispatch({
      type: 'CHANGE_NET',
      payload: selectNetwork,
    });

    toast.success('Import account successfully');

    setSubmitting(false);
  }

  return (
    <div className={styles.container}>
      <Title className={styles.title}>
        Import account
      </Title>
      {bannerText ? <Banner text={bannerText} onClose={() => setBannerText('')} /> : null}
      <form onSubmit={handleSubmit} className={styles.form}>
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
    </div>
  );
};
