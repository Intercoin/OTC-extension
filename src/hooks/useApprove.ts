import Web3 from 'web3';
import { useState } from 'react';
import { currentAccountInfo } from 'utils';
import { toast } from 'react-toastify';

export type Props = {
  web3: any,
  methodsERC20: any,
  addressSwap: string,
  tokenAddress: string,
  amount: string,
  address: string,
  estimateGas?: string,
};

export const useApprove = ({
  methodsERC20,
  addressSwap,
  tokenAddress,
  amount,
  web3,
  address,
  estimateGas,
}: Props) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const approve = async () => {
    try {
      setLoading(true);
      const account = await currentAccountInfo({ address });

      const tx = {
        from: account?.address,
        to: tokenAddress,
        gas: estimateGas,
        data: methodsERC20.approve(addressSwap, Web3.utils.toWei(amount, 'ether')).encodeABI(),
      };

      const signedTransactionData = await web3.eth.accounts.signTransaction(
        tx,
        account?.privateKey,
      );
      await web3.eth.sendSignedTransaction(signedTransactionData.rawTransaction);

      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.error('Approve reject');
      console.log(e);
      throw (e);
    }
  };

  return { approve, isLoading };
};
