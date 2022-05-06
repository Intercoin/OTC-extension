import React, { Dispatch, FC } from 'react';
import { Button, Input, Title } from 'components';
import { useFormik } from 'formik';
import { initialValues, Values, validationSchema } from './formik-data';

import styles from './styles.module.scss';

type Props = {
  setStep: Dispatch<number>
};

export const CreatePassword: FC<Props> = ({ setStep }) => {
  const onSubmit = () => {
    setStep(3);
  };

  const formik = useFormik<Values>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const {
    values: {
      pass,
      confirmPass,
    },
    handleSubmit,
    handleBlur,
    handleChange,
    isValid,
    touched,
    errors,
    dirty,
  } = formik;

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <Title className={styles.title}>
        Create password
      </Title>

      <h4>
        New password (min. 8 characters)
      </h4>
      <Input
        type="password"
        name="pass"
        value={pass}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched?.pass && errors?.pass}
      />

      <h4>
        Confirm password
      </h4>
      <Input
        type="password"
        name="confirmPass"
        value={confirmPass}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched?.confirmPass && errors?.confirmPass}
      />

      <Button
        className={styles.button}
        disabled={!dirty || !isValid}
        type="submit"
      >
        Get started
      </Button>
    </form>
  );
};
