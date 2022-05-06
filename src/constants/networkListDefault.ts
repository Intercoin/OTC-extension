import { Network } from 'contexts/types';

export const networkListDefault: Network[] = [
  {
    chainId: 4,
    httpProvider: 'https://eth-rinkeby.alchemyapi.io/v2/JnkdVOGnQ-uvjAl2jto1-V1OL3Vquq-H',
    label: 'Rinkeby',
  },
  {
    chainId: 97,
    httpProvider: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    label: 'BSC Testnet',
  },
];
