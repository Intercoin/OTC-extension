export type ModalSignProps = {
  infoModal: {
    hash: string,
  }
  isOpen: boolean,
  setOpen: (isOpen: boolean) => void,
  setSignedMsg: (signMsg: any) => void,
  nextFunc: () => void,
};
