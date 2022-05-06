import React, {
  FC,
  useState,
} from 'react';
import cn from 'classnames';

import { ReactComponent as Cross } from 'assets/image/cross.svg';

import styles from './styles.module.scss';

type Props = {
  className?: string,
  onClose?: () => void,
  text: string,
};

export const Banner: FC<Props> = ({
  text,
  className,
  onClose,
}) => {
  const [isShow, setShow] = useState<boolean>(true);

  return (
    isShow ? (
      <div className={cn(styles.container, className)}>

        <div className={styles.header}>
          <button
            onClick={() => {
              setShow(false);
              if (onClose) {
                onClose();
              }
            }}
            className={styles.closeWrapper}
          >
            <Cross className={styles.close} />
          </button>
        </div>

        <h4 className={styles.text}>
          {text}
        </h4>
      </div>
    ) : null
  );
};
