import {
  IEIP1193Provider,
  isValidChain,
  OChainId,
  TChainId,
} from '@lombard.finance/sdk';
import { useConnection } from 'modules/auth';
import { IStakeFormValues } from 'modules/common/components/BtcAmountField/types';
import { DEFAULT_CHAIN_ID, SATOSHI_SCALE } from 'modules/common/const';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import {
  generateAddress,
  getEthereumSignature,
  getNonEthereumSignature,
} from '../utils/addressGeneration';
import { useDepositBtcAddress } from './useDepositBtcAddress';
import { useLBTCExchangeRate } from './useLBTCExchangeRate';
import { useLBTCMintingFee } from './useLBTCMintingFee';
import { useNetworkFeeSignature } from './useNetworkFeeSignature';

const ETHEREUM_CHAINS: TChainId[] = [OChainId.ethereum, OChainId.holesky];

export const useStakeForm = () => {
  const { chainId, address, connector } = useConnection();

  const chain = chainId && isValidChain(chainId) ? chainId : DEFAULT_CHAIN_ID;

  const isEthereumChain = ETHEREUM_CHAINS.includes(chain);

  const {
    hasSignature,
    isExpired,
    isLoading: isNetworkFeeSignatureLoading,
    refetch: refetchNetworkFeeSignature,
  } = useNetworkFeeSignature();

  const {
    hasAddress,
    isLoading: isDepositBtcAddressLoading,
    refetch: refetchDepositBtcAddress,
  } = useDepositBtcAddress();

  const needsSignature = !hasSignature || isExpired;

  const { minAmount: minAmountSats } = useLBTCExchangeRate(chain);

  const { networkFee } = useLBTCMintingFee(chain);

  const minAmount = useMemo(() => {
    if (!minAmountSats) return 0;
    return minAmountSats / SATOSHI_SCALE;
  }, [minAmountSats]);

  const methods = useForm<IStakeFormValues>({
    defaultValues: {
      amount: '',
      chain: chain,
      captchaToken: '',
    },
    mode: 'onChange',
  });

  const { handleSubmit, watch, setValue } = methods;

  useEffect(() => {
    setValue('chain', chainId as TChainId);
  }, [chainId]);

  const amount = watch('amount');
  const captchaToken = watch('captchaToken');
  const onSubmit = async () => {
    try {
      const provider = (await connector?.getProvider()) as IEIP1193Provider;
      if (!chain || !address || !provider || !networkFee) {
        return;
      }

      const { signature, eip712Data } = await (isEthereumChain
        ? getEthereumSignature({
            provider,
            chainId: chain,
            address,
            networkFee,
          })
        : getNonEthereumSignature({ provider, chainId: chain, address }));

      await refetchNetworkFeeSignature();

      if (!hasAddress) {
        await generateAddress({
          chainId: chain,
          address,
          signature,
          eip712Data,
        });

        await refetchDepositBtcAddress();
      }
    } catch (error) {
      console.error('Failed to generate deposit address:', error);
    }
  };

  const isLoading = isNetworkFeeSignatureLoading || isDepositBtcAddressLoading;

  return {
    methods,
    handleSubmit,
    onSubmit,
    amount,
    minAmount,
    chainId,
    hasAddress,
    needsSignature,
    isLoading,
    captchaToken,
  };
};
