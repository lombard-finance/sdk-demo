import {
  getStakeAndBakeVaults,
  IEIP1193Provider,
  isValidChain,
  SATOSHI_SCALE,
  signStakeAndBake,
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
import { generateAddress } from '../utils/addressGeneration';
import { useDepositBtcAddress } from './useDepositBtcAddress';
import { useLBTCExchangeRate } from './useLBTCExchangeRate';
import { useNetworkFeeSignature } from './useNetworkFeeSignature';
import { useStakeAndBakeSignature } from './useStakeAndBakeSignature';

export interface IStakeAndBakeFormValues extends IStakeFormValues {
  vaultKey: string;
  captchaToken: string;
}

interface StakeAndBakeAuthorizationArgs {
  provider: IEIP1193Provider;
  address: string;
  chainId: TChainId;
  amount: string | number;
}

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

  const { handleSubmit, watch, setValue } = methods;
  const chain = watch('chain');
  const amount = watch('amount');
  const selectedVaultKey = watch('vaultKey');
  const captchaToken = watch('captchaToken');

  useEffect(() => {
    setValue('chain', chainId as TChainId);
  }, [chainId]);

  const vaults = useMemo(() => {
    try {
      return getStakeAndBakeVaults(chain);
    } catch (error) {
      return [];
    }
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

  const handleStakeAndBakeAuthorization = async ({
    provider,
    address,
    chainId,
    amount,
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
      env: CURRENT_ENV,
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
        signatureData: typedData,
      });

      await refetchDepositBtcAddress();
    }

    enqueueSnackbar(
      `Successfully authorized stake and bake for ${amount} LBTC.`,
      {
        variant: 'success',
        autoHideDuration: 3000,
      },
    );
  };

  const handleStakeAndBakeAuthorize = async () => {
    const provider = (await connector?.getProvider()) as IEIP1193Provider;

    if (!provider || !address || !selectedVault) {
      throw new Error('Missing required fields');
    }

    await handleStakeAndBakeAuthorization({
      provider,
      address,
      chainId: chain,
      amount,
    });
  };

  return {
    methods,
    handleSubmit,
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
  };
};
