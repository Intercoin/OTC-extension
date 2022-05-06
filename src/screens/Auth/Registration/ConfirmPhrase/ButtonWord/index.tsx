import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { Button } from 'components';

import styles from './styles.module.scss';

type Props = {
  name: string,
  isClear: boolean,
  onClick: () => void,
};

export const ButtonWord: FC<Props> = ({ name, onClick, isClear }) => {
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    setActive(false);
  }, [isClear]);

  return (
    <Button className={cn(styles.button, { [styles.buttonActive]: active })} onClick={() => {
      setActive(!active);
      onClick();
    }}>
      {name}
    </Button>
  );
};
