import React, { FC, PropsWithChildren } from 'react';

import cn from 'classnames';
import RModal from 'react-modal';

import { ModalProps } from './types';

import styles from './styles.module.scss';

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  className,
  overlayClassName,
  children,
  ...rProps
}) => (
  <RModal
    {...rProps}
    ariaHideApp={false}
    shouldFocusAfterRender={false}
    className={cn(styles.modal, className)}
    overlayClassName={cn(styles.overlay, overlayClassName)}
  >
    {children}
  </RModal>
);
