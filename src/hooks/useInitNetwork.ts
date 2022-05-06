import { networkListDefault } from '../constants';

export const useInitNetwork = () => {
  const selectNetworkState = localStorage.getItem('selectNetwork');
  const selectNetworkJSONParse = JSON.parse(selectNetworkState || '{}');

  let selectNetwork = selectNetworkJSONParse;

  if (!selectNetworkJSONParse?.chainId) {
    const [sw] = networkListDefault;
    selectNetwork = sw;

    localStorage.setItem('selectNetwork', JSON.stringify(networkListDefault[0]));
  }

  const networkListState = localStorage.getItem('networkList');
  const networkListJSONParse = JSON.parse(networkListState || '{}');
  const networkListPars = networkListJSONParse.length > 0 ? networkListJSONParse.filter((network) => (
    networkListDefault.filter((networkDefault) => networkDefault.chainId !== network.chainId).length
  )) : networkListDefault;

  if (!networkListJSONParse?.[0]?.chainId) {
    localStorage.setItem('networkList', JSON.stringify(networkListDefault));
  }

  return { networkList: networkListPars, selectNetwork };
};
