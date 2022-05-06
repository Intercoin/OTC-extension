import React, { Dispatch, FC, useState } from 'react';
import cn from 'classnames';
import { Banner, Button, Title } from 'components';

import styles from './styles.module.scss';

type Props = {
  phrase: string,
  setStep: Dispatch<number>
};

export const CreatePhrase: FC<Props> = ({ phrase, setStep }) => {
  const [isShow, setShow] = useState<boolean>(false);

  const handleNext = () => {
    setStep(4);
  };

  return (
    <div className={styles.container}>
      <Title className={styles.title}>
        Create phrase
      </Title>

      <Banner text="Write down this phrase and keep it in the safe place. Do not share this
       phrase to anybody. This phrase is the only way to recover your wallet" />

      <div className={styles.phraseWrap}>

        {
          !isShow ? (
            <Button
              onClick={() => setShow(true)}
              className={styles.buttonShow}
            >
              Show
            </Button>
          ) : null
        }

        <div className={cn(styles.phraseContainer, { [styles.phraseShow]: isShow })}>
          {phrase}
        </div>
      </div>

      <Button onClick={handleNext} disabled={!isShow}>
        Next
      </Button>
    </div>
  );
};
