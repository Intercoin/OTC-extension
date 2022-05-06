import { useState } from 'react';
import { currentAccountInfo } from 'utils';
import { toast } from 'react-toastify';

export type Props = {
  web3: any,
  methodsSwap: any,
  addressSwap: string,
  hash: string,
  address: string,
  signature: string,
  signedMsg: any,
};

export const useClaim = ({
  methodsSwap,
  addressSwap,
  hash,
  web3,
  address,
  signature,
  signedMsg,
}: Props) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const claim = async () => {
    try {
      setLoading(true);

      const account = await currentAccountInfo({ address });

      const data = methodsSwap.claim(
        `0x${hash}`,
        [signature, signedMsg.signature],
      ).encodeABI();

      const estimateGas = await web3.eth.estimateGas({
        data,
        from: account.address,
        to: addressSwap,
      });

      const tx = {
        from: account.address,
        to: addressSwap,
        gas: estimateGas,
        data: methodsSwap.claim(
          `0x${hash}`,
          [signature, signedMsg.signature],
        ).encodeABI(),
      };

      const signedTransactionData = await web3.eth.accounts.signTransaction(tx, account.privateKey);
      await web3.eth.sendSignedTransaction(signedTransactionData.rawTransaction);
      setLoading(false);
      toast.success('Claim successful');
    } catch (e) {
      setLoading(false);
      toast.error('Claim reject');
      console.log(e);
      throw (e);
    }
  };

  return { claim, isLoading };
};
