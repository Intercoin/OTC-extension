import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import rinkebyAbi from 'abi/rinkeby.json';
import ERC20Abi from 'abi/erc20.json';
import { useContext } from 'react';
import { ContextProvider } from 'contexts';
import { ContextProviderT } from 'contexts/types';
import {
  SWAP_RINKEBY_ADDRESS,
} from '../constants';

type Methods = {
  methodsSwap: any,
  methodsERC20: any,
  chainId: number | null,
  account: string,
  web3: any,
};

export const useLoadWeb3 = (address?: string): Methods => {
  const { state } = useContext<ContextProviderT>(ContextProvider);

  const providers = new Web3.providers.HttpProvider(state.selectNetwork?.httpProvider);
  const web3 = new Web3(providers);

  const methodsSwap = new web3.eth.Contract(rinkebyAbi as AbiItem[], SWAP_RINKEBY_ADDRESS)?.methods;
  const methodsERC20 = new web3.eth.Contract(ERC20Abi as AbiItem[], address)?.methods;

  return {
    methodsSwap,
    methodsERC20,
    web3,
    chainId: state.selectNetwork.chainId,
    account: state.selectAccount.address,
  };
};
