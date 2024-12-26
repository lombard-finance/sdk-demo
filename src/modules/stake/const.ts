import { OChainId, TChainId } from '@lombard.finance/sdk';

export const SUPPORTED_CHAINS: Record<number, string> = {
  [OChainId.holesky]: 'Holesky',
  [OChainId.baseTestnet]: 'Base Sepolia',
  [OChainId.binanceSmartChainTestnet]: 'Binance Smart Chain Testnet',
};

export const DEFAULT_CHAIN_ID: TChainId = OChainId.holesky; // Default to Holesky for testing

export const PARTNER_ID = 'lombard';

export const CAPTCHA_TOKEN = '65716571657165716571657165716571';

export const ENV = 'prod' as const;

export const ONE_DAY_SECONDS = 24 * 60 * 60;

export const STEPS = {
  CONNECT_WALLET: 0,
  NETWORK_FEE: 1,
  DEPOSIT_ADDRESS: 2,
  MONITOR_DEPOSITS: 3,
} as const;
