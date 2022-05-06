import Web3 from 'web3';
import { useState } from 'react';
import { currentAccountInfo } from 'utils';
import { toast } from 'react-toastify';

export type Props = {
  web3: any,
  methodsSwap: any,
  addressSwap: string,
  otherParticipantAddress: string,
  senderPenalty: string,
  senderTokenAddress: string,
  amount: string,
  hash: string,
  address: string,
};

export const useLock = ({
  methodsSwap,
  hash,
  addressSwap,
  senderTokenAddress,
  senderPenalty,
  otherParticipantAddress,
  amount,
  web3,
  address,
}: Props) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const lock = async () => {
    try {
      setLoading(true);

      const account = await currentAccountInfo({ address });

      const tx = {
        from: account.address,
        to: addressSwap,
        gas: 5000000,
        data: methodsSwap.lock(
          `0x${hash}`,
          Web3.utils.toWei(amount, 'ether'),
          senderTokenAddress,
          otherParticipantAddress,
          Web3.utils.toWei(senderPenalty, 'ether'),
        ).encodeABI(),
      };
      const signedTransactionData = await web3.eth.accounts.signTransaction(tx, account.privateKey);
      const a = await web3.eth.sendSignedTransaction(signedTransactionData.rawTransaction);
      console.log(a);
      setLoading(false);
      toast.success('Lock successful');
    } catch (e) {
      setLoading(false);
      toast.error('Lock Reject');
      console.log(e);
      throw (e);
    }
  };

  return { lock, isLoading };
};
