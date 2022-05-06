import { Props as InfoApprove } from 'hooks/useApprove';

export type ApproveProps = {
  infoModal: {
    acronym: string,
    fee: string,
    amount: string,
    hash: string,
    network: string,
    data: string,
    estimateGas: string,
  }
  infoApprove: InfoApprove,
  isOpen: boolean,
  setOpen: (isOpen: boolean) => void,
  nextFunc: () => void,
};
