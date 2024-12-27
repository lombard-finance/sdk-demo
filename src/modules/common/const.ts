import { OChainId } from '@lombard.finance/sdk';
import { Seconds, TEnv } from './types';

export const ROOT_PATH = '/';

export const ACTION_CACHE: Seconds = 60;
export const ACTION_CACHE_LONG: Seconds = 600;

export const metaEnv = import.meta.env;
export const CURRENT_ENV = metaEnv.VITE_ENV as TEnv;
export const IS_PROD = CURRENT_ENV === 'prod';
export const IS_STAGE = CURRENT_ENV === 'stage' || !IS_PROD;
export const IS_LOCAL = metaEnv.VITE_IS_LOCAL === 'true';
export const NAME = metaEnv.VITE_NAME;
export const VERSION = metaEnv.VITE_VERSION;

export const DEFAULT_CHAIN_ID = OChainId.holesky;

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
