export function defineNetwork(chainId: number | null) {
  let networkName = '';

  switch (chainId) {
    case 4:
      networkName = 'Rinkeby';
      break;
    case 97:
      networkName = 'BSC';
      break;
    default:
      networkName = '';
  }

  return { networkName };
}
