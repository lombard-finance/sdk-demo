import { OChainId } from '@lombard.finance/sdk';
import { default as BaseIcon } from 'modules/common/assets/base-network.svg?react';
import { default as BnbIcon } from 'modules/common/assets/bnb-chain.svg?react';
import { default as EthIcon } from 'modules/common/assets/eth-chain.svg?react';

export const getChainIcon = (chainId: number) => {
  switch (chainId) {
    case OChainId.holesky:
      return EthIcon;
    case OChainId.baseTestnet:
      return BaseIcon;
    case OChainId.binanceSmartChainTestnet:
      return BnbIcon;
    default:
      return null;
  }
};