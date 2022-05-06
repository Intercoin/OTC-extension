import { Props as InfoClaim } from 'hooks/useClaim';

export type ModalClaimProps = {
  infoClaim: InfoClaim,
  isOpen: boolean,
  setOpen: (isOpen: boolean) => void,
};
