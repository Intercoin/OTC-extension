import Web3 from 'web3';
import { Dispatch } from 'react';

type Props = {
  setIsLoadingGas: Dispatch<boolean>,
  web3: any,
  estimateGas: string,
  setGasPrice: Dispatch<number>,
};

export const getGasPrice = async ({
  setIsLoadingGas,
  web3,
  estimateGas,
  setGasPrice,
}: Props) => {
  try {
    setIsLoadingGas(true);
    const _gasPrice = await web3.eth.getGasPrice();

    const fee = Web3.utils.toBN(_gasPrice).mul(Web3.utils.toBN(estimateGas));
    const feeToNumber = +(Web3.utils.fromWei(fee));

    setGasPrice(+feeToNumber.toFixed(5));
    setIsLoadingGas(false);
  } catch (e) {
    console.log(e);
    setIsLoadingGas(false);
    throw (e);
  }
};
