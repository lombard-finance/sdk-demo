import {
  getLBTCMintingFee,
  getStakeAndBakeVaults,
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
import { STAKE_AND_BAKE_STATES } from '../const';
import { generateAddress } from '../utils/addressGeneration';
import { isEthereumChain } from '../utils/isEthereumChain';
import { useDepositBtcAddress } from './useDepositBtcAddress';
import { useLBTCExchangeRate } from './useLBTCExchangeRate';
import { useNetworkFeeSignature } from './useNetworkFeeSignature';
import { useStakeAndBakeSignature } from './useStakeAndBakeSignature';

export interface IStakeAndBakeFormValues extends IStakeFormValues {
  vaultKey: string;
  captchaToken: string;
}

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
  amount: string | number;
  captchaToken: string;
}

const getExpirySeconds = () => {
  return Math.floor(Date.now() / 1000 + ONE_DAY_SECONDS);
};

export const useStakeAndBakeForm = () => {
  const { chainId, address, connector } = useConnection();
  const { hasAddress, refetch: refetchDepositBtcAddress } =
    useDepositBtcAddress();
  const { refetch: refetchNetworkFeeSignature, ...networkFeeSignature } =
    useNetworkFeeSignature();

  const { refetch: refetchStakeAndBakeSignature, ...stakeAndBakeSignature } =
    useStakeAndBakeSignature();

  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<IStakeAndBakeFormValues>({
    defaultValues: {
      amount: '',
      chain: chainId && isValidChain(chainId) ? chainId : DEFAULT_CHAIN_ID,
      vaultKey: '',
      captchaToken: '',
    },
  });

  const { handleSubmit, watch } = methods;
  const chain = watch('chain');
  const amount = watch('amount');
  const selectedVaultKey = watch('vaultKey');
  const captchaToken = watch('captchaToken');

  const vaults = useMemo(() => {
    return getStakeAndBakeVaults(chain);
  }, [chain]);

  const selectedVault = useMemo(() => {
    return vaults.find(vault => vault.key === selectedVaultKey);
  }, [vaults, selectedVaultKey]);

  useEffect(() => {
    if (vaults.length > 0 && !selectedVaultKey) {
      methods.setValue('vaultKey', vaults[0].key);
    }
  }, [chain, vaults]);

  const { minAmount: minAmountSats } = useLBTCExchangeRate(chain);
  const minAmount = useMemo(() => {
    if (!minAmountSats) return 0;
    return minAmountSats / SATOSHI_SCALE;
  }, [minAmountSats]);

  const generateBtcDepositAddress = async () => {
    const provider = (await connector?.getProvider()) as IEIP1193Provider;
    if (!provider || !address || !captchaToken || !selectedVault) {
      throw new Error('Missing required fields');
    }
    if (!address || !chainId || !captchaToken) return;
    const expirySeconds = getExpirySeconds();
    const fee = await getLBTCMintingFee({
      chainId: chain,
    });

    const { signature, typedData } = await signNetworkFee({
      provider,
      address,
      chainId: chain,
      fee: toSatoshi(fee.toString()).toString(),
      expiry: expirySeconds,
      env: CURRENT_ENV,
    });

    await generateAddress({
      chainId: chain,
      address,
      signature,
      eip712Data: typedData,
      captchaToken,
    });

    await refetchNetworkFeeSignature();
    await refetchDepositBtcAddress();
  };

  const handleNetworkFeeAuthorization = async ({
    provider,
    address,
    chainId,
  }: NetworkFeeAuthorizationArgs) => {
    const expirySeconds = getExpirySeconds();
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

    if (!hasAddress) {
      await generateAddress({
        chainId,
        address,
        signature,
        eip712Data: typedData,
        captchaToken,
      });
    }

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
    amount,
    captchaToken,
  }: StakeAndBakeAuthorizationArgs) => {
    if (!selectedVault) {
      throw new Error('No vault selected');
    }

    const expirySeconds = Math.floor(Date.now() / 1000 + ONE_DAY_SECONDS);

    const { signature, typedData } = await signStakeAndBake({
      provider,
      address,
      chainId,
      value: toSatoshi(amount).toString(),
      expiry: expirySeconds,
      vaultKey: selectedVault.key,
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
    if (!provider || !address || !captchaToken || !selectedVault) {
      throw new Error('Missing required fields');
    }

    await handleStakeAndBakeAuthorization({
      provider,
      address,
      chainId: chain,
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
    selectedVault,
    vaults,
    captchaToken,
    stakeAndBakeSignature,
    networkFeeSignature,
    handleStakeAndBakeAuthorize,
    generateBtcDepositAddress,
  };
};
