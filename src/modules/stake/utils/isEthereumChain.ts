import { TChainId } from '@lombard.finance/sdk';
import { ETHEREUM_CHAINS } from '../const';

export const isEthereumChain = (chainId: TChainId) =>
  ETHEREUM_CHAINS.includes(chainId);
