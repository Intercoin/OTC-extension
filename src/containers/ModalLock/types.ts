import { Props as InfoLock } from 'hooks/useLock';

export type ModalLockProps = {
  infoLock: InfoLock,
  isOpen: boolean,
  setOpen: (isOpen: boolean) => void,
};
