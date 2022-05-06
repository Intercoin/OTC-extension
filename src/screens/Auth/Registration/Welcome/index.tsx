import React, { FC, Dispatch } from 'react';
import { Button, Text, Title } from 'components';

import styles from './styles.module.scss';

type Props = {
  setStep: Dispatch<number>
};

export const Welcome: FC<Props> = ({ setStep }) => {
  const handleOpenWindow = () => {
    setStep(1);
  };

  return (
    <div className={styles.container}>
      <Title className={styles.title}>
        Welcome to OTC
      </Title>

      <Text className={styles.text}>
        Connecting you to Ethereum and the decentralized network
        We are glad to see you.
      </Text>

      <Button onClick={handleOpenWindow}>
        Get started
      </Button>
    </div>
  );
};
