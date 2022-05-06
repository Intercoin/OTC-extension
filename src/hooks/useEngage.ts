import { useState } from 'react';
import { currentAccountInfo } from 'utils';
import { toast } from 'react-toastify';

export type Props = {
  web3: any,
  signedMsg: any,
  methodsSwap: any,
  addressSwap: string,
  hash: string,
  address: string,
};

export const useEngage = ({
  methodsSwap,
  addressSwap,
  hash,
  web3,
  address,
  signedMsg,
}: Props) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const engage = async () => {
    try {
      setLoading(true);

      const account = await currentAccountInfo({ address });

      const data = methodsSwap.engage(
        `0x${hash}`,
        signedMsg.signature,
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
        data: methodsSwap.engage(
          `0x${hash}`,
          signedMsg.signature,
        ).encodeABI(),
      };

      const signedTransactionData = await web3.eth.accounts.signTransaction(tx, account.privateKey);
      await web3.eth.sendSignedTransaction(signedTransactionData.rawTransaction);
      setLoading(false);
      toast.success('Engage successful');
    } catch (e) {
      setLoading(false);
      toast.error('Engage reject');
      console.log(e);
      throw (e);
    }
  };

  return { engage, isLoading };
};
