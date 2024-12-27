import {
  generateDepositBtcAddress,
  IEIP1193Provider,
  isValidChain,
  OChainId,
  signLbtcDestionationAddr,
  signNetworkFee,
  TChainId,
  toSatoshi,
} from '@lombard.finance/sdk';
import { useQueryClient } from '@tanstack/react-query';
import { useConnection } from 'modules/auth';
import { IStakeFormValues } from 'modules/common/components/BtcAmountField/types';
import {
  CURRENT_ENV,
  DEFAULT_CHAIN_ID,
  SATOSHI_SCALE,
} from 'modules/common/const';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDepositBtcAddress } from './useDepositBtcAddress';
import { useLBTCExchangeRate } from './useLBTCExchangeRate';
import { useLBTCMintingFee } from './useLBTCMintingFee';

const ETHEREUM_CHAINS: TChainId[] = [OChainId.ethereum, OChainId.holesky];

interface SignatureResult {
  signature: string;
  eip712Data?: string;
}

export const useStakeForm = () => {
  const { chainId, address, connector } = useConnection();
  const { hasAddress } = useDepositBtcAddress();
  const { minAmount: minAmountSats } = useLBTCExchangeRate(
    chainId || DEFAULT_CHAIN_ID,
  );
  const { networkFee } = useLBTCMintingFee(chainId || DEFAULT_CHAIN_ID);
  const queryClient = useQueryClient();

  const minAmount = useMemo(() => {
    if (!minAmountSats) return 0;
    return minAmountSats / SATOSHI_SCALE;
  }, [minAmountSats]);

  const methods = useForm<IStakeFormValues>({
    defaultValues: {
      amount: '',
      chain: DEFAULT_CHAIN_ID,
      captchaToken: '',
    },
    mode: 'onChange',
  });

  const { handleSubmit, watch } = methods;
  const amount = watch('amount');

  const getEthereumSignature = async (
    provider: IEIP1193Provider,
  ): Promise<SignatureResult> => {
    if (!networkFee || !chainId || !isValidChain(chainId) || !address) {
      throw new Error('Missing required data for Ethereum signature');
    }

    const ONE_DAY_SECONDS = 24 * 60 * 60;
    const expirySeconds = Math.floor(Date.now() / 1000 + ONE_DAY_SECONDS);
    const feeSatoshis = toSatoshi(networkFee.toString(10)).toString(10);

    const { signature, typedData } = await signNetworkFee({
      address,
      provider,
      chainId,
      fee: feeSatoshis,
      expiry: expirySeconds,
      env: CURRENT_ENV,
    });

    return { signature, eip712Data: typedData };
  };

  const getNonEthereumSignature = async (
    provider: IEIP1193Provider,
  ): Promise<SignatureResult> => {
    if (!chainId || !isValidChain(chainId) || !address) {
      throw new Error('Missing required data for signature');
    }

    const signature = await signLbtcDestionationAddr({
      account: address,
      chainId,
      provider,
    });

    return { signature };
  };

  const generateAddress = async (
    signature: string,
    eip712Data: string | undefined,
    captchaToken: string,
  ) => {
    if (!chainId || !isValidChain(chainId) || !address) {
      throw new Error('Missing required data for address generation');
    }

    await generateDepositBtcAddress({
      address,
      chainId,
      signature,
      eip712Data,
      captchaToken,
      env: CURRENT_ENV,
    });

    await queryClient.invalidateQueries({
      queryKey: ['depositBtcAddress', address, chainId],
    });
  };

  const onSubmit = async (data: IStakeFormValues) => {
    try {
      const provider = (await connector?.getProvider()) as IEIP1193Provider;
      if (
        !chainId ||
        !address ||
        !provider ||
        !isValidChain(chainId) ||
        !data.captchaToken
      ) {
        return;
      }

      const { signature, eip712Data } = await (ETHEREUM_CHAINS.includes(chainId)
        ? getEthereumSignature(provider)
        : getNonEthereumSignature(provider));

      await generateAddress(signature, eip712Data, data.captchaToken);
    } catch (error) {
      console.error('Failed to generate deposit address:', error);
      // You might want to show an error notification here
    }
  };

  const isDisabled = !amount || !chainId || hasAddress;

  return {
    methods,
    handleSubmit,
    onSubmit,
    amount,
    minAmount,
    chainId,
    hasAddress,
    isDisabled,
  };
};
