import React, { Dispatch, FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Text, Title } from 'components';
import { ROUTES } from '../../../../constants';

import styles from './styles.module.scss';

type Props = {
  setStep: Dispatch<number>
};

export const SelectAction: FC<Props> = ({ setStep }) => (
  <div className={styles.container}>
    <Title className={styles.title}>
      First time in OTC?
    </Title>

    <div className={styles.blockWrap}>
      <div className={styles.block}>
        <Text className={styles.text}>
          No, I already have a recovery passphrase

          Import an existing wallet using the initial passphrase
        </Text>
        <Link to={`/auth/${ROUTES.auth.importAccount}`}>
          <Button>
            Import Wallet
          </Button>
        </Link>
      </div>

      <div className={styles.block}>
        <Text className={styles.text}>
          Yes, let's set it up!
          This will create a new wallet and a secret phrase to restore
        </Text>

        <Button onClick={() => setStep(2)}>
          Create Wallet
        </Button>
      </div>
    </div>
  </div>
);
