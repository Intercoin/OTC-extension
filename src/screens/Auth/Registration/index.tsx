import React, { FC, useMemo, useState } from 'react';

import { Mnemonic } from 'wallet.ts';
import { randomBytes } from 'crypto';
import { CreatePhrase } from './CreatePhrase';
import { ConfirmPhrase } from './ConfirmPhrase';
import { Welcome } from './Welcome';
import { SelectAction } from './SelectAction';
import { CreatePassword } from './CreatePassword';

export const Registration: FC = () => {
  const [step, setStep] = useState<number>(0);

  const mnemonic = useMemo(() => Mnemonic.generate(randomBytes(16)), []);
  const { phrase } = mnemonic;

  switch (step) {
    case 0:
      return <Welcome setStep={setStep} />;
    case 1:
      return <SelectAction setStep={setStep} />;
    case 2:
      return <CreatePassword setStep={setStep} />;
    case 3:
      return <CreatePhrase phrase={phrase} setStep={setStep} />;
    case 4:
      return <ConfirmPhrase phrase={phrase} />;
    default:
      return <Welcome setStep={setStep} />;
  }
};
