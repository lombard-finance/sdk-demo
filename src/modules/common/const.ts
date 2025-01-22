import { OChainId, TEnv } from '@lombard.finance/sdk';
import { Seconds } from './types';

export const ROOT_PATH = '/';

export const ACTION_CACHE: Seconds = 60;
export const ACTION_CACHE_LONG: Seconds = 600;

export const CURRENT_ENV = 'prod' as TEnv;

export const DEFAULT_CHAIN_ID = OChainId.binanceSmartChain;

export const DECIMAL_PLACES_ZERO = 0;
export const DECIMAL_PLACES = 4;
export const USD_DECIMAL_PLACES = 2;
export const DECIMAL_PLACES_SHORT = 2;
export const DECIMAL_PLACES_LUX = 0;
export const DECIMAL_PLACES_BTC = 6;
export const ETH_DECIMALS = 18;
export const ETH_SCALE = 10 ** ETH_DECIMALS;
export const ERC20_TOKEN_DECIMALS = ETH_DECIMALS;
export const BTC_DECIMALS = 8;
export const SATOSHI_SCALE = 10 ** BTC_DECIMALS;

export const ONativeToken = {
  BTC: 'BTC',
};

export const ONE_DAY_SECONDS = 24 * 60 * 60;
