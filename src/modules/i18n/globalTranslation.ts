import { OChainId, TChainId } from '@lombard.finance/sdk';
import { Locale } from './locales';

const chainTranslation: Record<TChainId, string> = {
  [OChainId.ethereum]: 'Ethereum',
  [OChainId.holesky]: 'Holesky',
  [OChainId.binanceSmartChain]: 'BNB',
  [OChainId.binanceSmartChainTestnet]: 'BNB testnet',
  [OChainId.sepolia]: 'Sepolia',
  [OChainId.base]: 'Base',
  [OChainId.baseSepoliaTestnet]: 'Base Sepolia',
  [OChainId.berachainBartioTestnet]: 'Berachain bArtio',
  [OChainId.corn]: 'Corn',
  [OChainId.swell]: 'Swell',
};

export const globalTranslation = {
  [Locale.en]: {
    appName: 'Lombard SDK Demo',
    format: {
      date: '{value, date, medium}',
      timeShort: '{value, time, short}',
      numberCompact: '{value, number, ::compact-short}',
    },
    unit: {
      usdValue: '${value}',
      pctValue: '{value}%',
      tokenValue: '{value} {token}',
    },
    wallets: {
      confirmTxn: 'Please confirm the transaction in your wallet.',
    },
    requestError: {
      switchNetwork: 'Failed to switch network.',
      unknown: 'Unknown Error',
    },
    chain: chainTranslation,
    validation: {
      required: 'This field is required',
      numberOnly: 'Must be a number',
      min: 'Minimum amount {value}',
      max: 'Maximum amount {value}',
      email: 'Invalid email address',
      address: 'Invalid address',
      lowBalance: 'Your balance is not sufficient',
      notEnoughToken: "You don't have enough {token} in your wallet",
    },
  },
};
