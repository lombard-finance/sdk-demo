import {
  getLBTCMintingFee,
  IEIP1193Provider,
  isValidChain,
  SATOSHI_SCALE,
  signNetworkFee,
  signStakeAndBake,
  storeNetworkFeeSignature,
  storeStakeAndBakeSignature,
  TChainId,
  toSatoshi,
} from '@lombard.finance/sdk';
import { useConnection } from 'modules/auth';
import { IStakeFormValues } from 'modules/common/components/BtcAmountField/types';
import {
  CURRENT_ENV,
  DEFAULT_CHAIN_ID,
  ONE_DAY_SECONDS,
} from 'modules/common/const';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { getProtocolContracts, STAKE_AND_BAKE_STATES } from '../const';
import { generateAddress } from '../utils/addressGeneration';
import { isEthereumChain } from '../utils/isEthereumChain';
import { useDepositBtcAddress } from './useDepositBtcAddress';
import { useLBTCExchangeRate } from './useLBTCExchangeRate';
import { useNetworkFeeSignature } from './useNetworkFeeSignature';
import { useStakeAndBakeSignature } from './useStakeAndBakeSignature';

export interface IStakeAndBakeFormValues extends IStakeFormValues {
  protocol: string;
  spender?: string;
  verifyingContract?: string;
  callData?: string;
}

export type Protocol = {
  name: string;
  spender: string;
};

interface StakeAndBakeFormData extends IStakeAndBakeFormValues {
  step?: 'networkFee' | 'authorization';
}

interface NetworkFeeAuthorizationArgs {
  provider: IEIP1193Provider;
  address: string;
  chainId: TChainId;
}

interface StakeAndBakeAuthorizationArgs {
  provider: IEIP1193Provider;
  address: string;
  chainId: TChainId;
  spender: string;
  amount: string | number;
  captchaToken: string;
}

export const useStakeAndBakeForm = () => {
  const { chainId, address, connector } = useConnection();
  const { hasAddress } = useDepositBtcAddress();
  const { refetch: refetchNetworkFeeSignature, ...networkFeeSignature } =
    useNetworkFeeSignature();

  const { refetch: refetchStakeAndBakeSignature, ...stakeAndBakeSignature } =
    useStakeAndBakeSignature();

  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<IStakeAndBakeFormValues>({
    defaultValues: {
      amount: '',
      chain: chainId && isValidChain(chainId) ? chainId : DEFAULT_CHAIN_ID,
      protocol: 'vault',
      captchaToken: '',
    },
  });

  const { handleSubmit, watch } = methods;
  const chain = watch('chain');
  const amount = watch('amount');
  const spender = watch('spender');
  const selectedProtocol = watch('protocol');
  const isCustomProtocol = selectedProtocol === 'custom';
  const captchaToken = watch('captchaToken');

  const protocol: Protocol = isCustomProtocol
    ? {
        name: 'Custom',
        spender: spender || '',
      }
    : getProtocolContracts(chain, selectedProtocol);

  useEffect(() => {
    const _protocol = getProtocolContracts(chain, selectedProtocol);
    if (_protocol) {
      methods.setValue('spender', _protocol.spender);
    } else {
      methods.setValue('spender', '');
    }
  }, [selectedProtocol]);

  const { minAmount: minAmountSats } = useLBTCExchangeRate(chain);
  const minAmount = useMemo(() => {
    if (!minAmountSats) return 0;
    return minAmountSats / SATOSHI_SCALE;
  }, [minAmountSats]);

  const handleNetworkFeeAuthorization = async ({
    provider,
    address,
    chainId,
  }: NetworkFeeAuthorizationArgs) => {
    const expirySeconds = Math.floor(Date.now() / 1000 + ONE_DAY_SECONDS);
    const fee = await getLBTCMintingFee({
      chainId,
    });

    const { signature, typedData } = await signNetworkFee({
      provider,
      address,
      chainId,
      fee: toSatoshi(fee.toString()).toString(),
      expiry: expirySeconds,
      env: CURRENT_ENV,
    });

    await storeNetworkFeeSignature({
      address,
      signature,
      typedData,
      env: CURRENT_ENV,
    });

    await refetchNetworkFeeSignature();
    enqueueSnackbar('Network fee authorized successfully', {
      variant: 'success',
    });
  };

  const handleStakeAndBakeAuthorization = async ({
    provider,
    address,
    chainId,
    spender,
    amount,
    captchaToken,
  }: StakeAndBakeAuthorizationArgs) => {
    const expirySeconds = Math.floor(Date.now() / 1000 + ONE_DAY_SECONDS);

    const { signature, typedData } = await signStakeAndBake({
      provider,
      address,
      chainId,
      value: toSatoshi(amount).toString(),
      expiry: expirySeconds,
      spender,
    });

    await storeStakeAndBakeSignature({
      signature,
      typedData,
      env: CURRENT_ENV,
    });

    await refetchStakeAndBakeSignature();

    if (!hasAddress) {
      await generateAddress({
        chainId,
        address,
        signature,
        eip712Data: typedData,
        captchaToken,
      });
    }

    enqueueSnackbar(
      `Successfully authorized stake and bake for ${amount} LBTC.`,
      {
        variant: 'success',
        autoHideDuration: 5000,
      },
    );
  };

  const onSubmit = async (data: StakeAndBakeFormData) => {
    try {
      const provider = (await connector?.getProvider()) as IEIP1193Provider;
      if (!address || !provider) {
        throw new Error('Missing required fields');
      }

      switch (data.step) {
        case STAKE_AND_BAKE_STATES.NETWORK_FEE:
          if (isEthereumChain(chain)) {
            await handleNetworkFeeAuthorization({
              provider,
              address,
              chainId: chain,
            });
          }
          break;

        case STAKE_AND_BAKE_STATES.AUTHORIZATION:
          if (!stakeAndBakeSignature) {
            if (!data.captchaToken || !protocol?.spender) {
              throw new Error('Missing required fields');
            }

            await handleStakeAndBakeAuthorization({
              provider,
              address,
              chainId: chain,
              spender: protocol.spender,
              amount,
              captchaToken: data.captchaToken,
            });
          }
          break;

        default:
          throw new Error('Invalid step');
      }
    } catch (error) {
      console.error('Failed to process stake and bake:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to process stake and bake';
      enqueueSnackbar(errorMessage, { variant: 'error' });
      throw error;
    }
  };

  const handleStakeAndBakeAuthorize = async () => {
    const provider = (await connector?.getProvider()) as IEIP1193Provider;
    if (!provider || !address || !captchaToken || !protocol?.spender) {
      throw new Error('Missing required fields');
    }

    await handleStakeAndBakeAuthorization({
      provider,
      address,
      chainId: chain,
      spender: protocol.spender,
      amount,
      captchaToken,
    });
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    amount,
    minAmount,
    chain,
    hasAddress,
    selectedProtocol,
    isCustomProtocol,
    protocol,
    captchaToken,
    stakeAndBakeSignature,
    networkFeeSignature,
    handleStakeAndBakeAuthorize,
  };
};
