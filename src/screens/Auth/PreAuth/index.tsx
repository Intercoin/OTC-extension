import React, { FC, useEffect } from 'react';
import { Loader } from 'components';
import { ROUTES } from '../../../constants';

import styles from './styles.module.scss';

export const PreAuth: FC = () => {
  const handleClose = async () => {
    window.close();
  };

  useEffect(() => {
    chrome.windows.create({
      url: `${chrome.runtime.getURL('./index.html')}/#/auth/${ROUTES.auth.welcome}`,
      type: 'normal',
    });
    handleClose();
  }, []);

  return (
    <div className={styles.container}>
      <Loader />
    </div>
  );
};
