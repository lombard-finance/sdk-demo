import {
  generateDepositBtcAddress,
  IEIP1193Provider,
  isValidChain,
  signLbtcDestionationAddr,
  signNetworkFee,
  storeNetworkFeeSignature,
  TChainId,
  toSatoshi,
} from '@lombard.finance/sdk';
import { BigNumber } from 'bignumber.js';
import { CURRENT_ENV } from 'modules/common/const';
import { PARTNER_ID } from '../const';

const getAuthorizationExpirationTime = () => {
  const ONE_DAY_SECONDS = 24 * 60 * 60;
  return Math.floor(Date.now() / 1000 + ONE_DAY_SECONDS);
};

export interface SignatureResult {
  signature: string;
  eip712Data?: string;
}

export const getEthereumSignature = async ({
  provider,
  chainId,
  address,
  networkFee,
}: {
  provider: IEIP1193Provider;
  chainId: TChainId;
  address: string;
  networkFee: BigNumber;
}): Promise<SignatureResult> => {
  const feeSatoshis = toSatoshi(networkFee.toString(10)).toString(10);

  const { signature, typedData } = await signNetworkFee({
    address,
    provider,
    chainId,
    fee: feeSatoshis,
    expiry: getAuthorizationExpirationTime(),
    env: CURRENT_ENV,
  });

  await storeNetworkFeeSignature({
    signature,
    typedData: typedData || '',
    env: CURRENT_ENV,
    address: address.toLowerCase(),
  });

  return { signature, eip712Data: typedData };
};

export const getNonEthereumSignature = async ({
  provider,
  chainId,
  address,
}: {
  provider: IEIP1193Provider;
  chainId: TChainId;
  address: string;
}): Promise<SignatureResult> => {
  const signature = await signLbtcDestionationAddr({
    account: address,
    chainId,
    provider,
  });

  return { signature };
};

interface IGenerateAddressParams {
  chainId: TChainId;
  address: string;
  signature: string;
  eip712Data?: string;
  signatureData?: string;
}

export const generateAddress = async ({
  chainId,
  address,
  signature,
  eip712Data,
  signatureData,
}: IGenerateAddressParams) => {
  if (!chainId || !isValidChain(chainId) || !address) {
    throw new Error('Missing required data for address generation');
  }

  await generateDepositBtcAddress({
    address,
    chainId,
    signature,
    eip712Data,
    signatureData,
    partnerId: PARTNER_ID,
    env: CURRENT_ENV,
  });
};
