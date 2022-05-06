import { Props as InfoEngage } from 'hooks/useEngage';

export type ModalEngageProps = {
  infoEngage: InfoEngage,
  isOpen: boolean,
  setOpen: (isOpen: boolean) => void,
};
