import { getLbtcAddressConfig, OChainId, TChainId } from '@lombard.finance/sdk';
import { CURRENT_ENV } from 'modules/common/const';

export const SUPPORTED_CHAINS: Record<number, string> = {
  [OChainId.holesky]: 'Holesky',
  [OChainId.baseSepoliaTestnet]: 'Base Sepolia',
  [OChainId.binanceSmartChainTestnet]: 'Binance Smart Chain Testnet',
  [OChainId.binanceSmartChain]: 'Binance Smart Chain',
};

export const DEFAULT_CHAIN_ID: TChainId = OChainId.binanceSmartChain; // Default to Holesky for testing

export const PARTNER_ID = 'demoapp';

export const ONE_DAY_SECONDS = 24 * 60 * 60;

export const STEPS = {
  CONNECT_WALLET: 0,
  NETWORK_FEE: 1,
  DEPOSIT_ADDRESS: 2,
  MONITOR_DEPOSITS: 3,
} as const;

export const ETHEREUM_CHAINS: TChainId[] = [
  OChainId.ethereum,
  OChainId.holesky,
];

export const SUPPORTED_PROTOCOLS = {
  [OChainId.holesky]: {
    vault: {
      name: 'Veda / Lombard Defi Vault',
      spender: '0x52BD640617eeD47A00dA0da93351092D49208d1d',
      verifyingContract: '0xED7bfd5C1790576105Af4649817f6d35A75CD818',
    },
  },
  [OChainId.binanceSmartChainTestnet]: {
    vault: {
      name: 'Veda / Lombard Defi Vault',
      spender: '0x52BD640617eeD47A00dA0da93351092D49208d1d',
      verifyingContract: '0x731eFa688F3679688cf60A3993b8658138953ED6',
    },
  },
};

export const getProtocolContracts = (chainId: number, protocol: string) => {
  return SUPPORTED_PROTOCOLS[chainId as keyof typeof SUPPORTED_PROTOCOLS]?.[
    protocol as keyof (typeof SUPPORTED_PROTOCOLS)[keyof typeof SUPPORTED_PROTOCOLS]
  ];
};

export const getProtocolsForChain = (chainId: number) => {
  return SUPPORTED_PROTOCOLS[chainId as keyof typeof SUPPORTED_PROTOCOLS];
};

export const getVerifyingContract = (chainId: number) => {
  const lbtcAddressConfig = getLbtcAddressConfig(CURRENT_ENV);
  return lbtcAddressConfig[chainId as keyof typeof lbtcAddressConfig];
};

export const STAKE_AND_BAKE_STATES = {
  DEFAULT: 'default',
  NETWORK_FEE: 'networkFee',
  CONFIRMATION: 'confirmation',
  READY: 'ready',
} as const;

export type StakeAndBakeState =
  (typeof STAKE_AND_BAKE_STATES)[keyof typeof STAKE_AND_BAKE_STATES];
