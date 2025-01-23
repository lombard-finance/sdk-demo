import { isValidChain, getStakeAndBakeFee, fromSatoshi } from '@lombard.finance/sdk';
import { useQuery } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';

export const useStakeAndBakeFee = (chainId: number, vaultAddress: string) => {
  const {
    data: stakeAndBakeFee,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['stakeAndBakeFee', chainId],
    queryFn: async () => {
      if (!isValidChain(chainId)) {
        return undefined;
      }

      const fee =  await getStakeAndBakeFee({
        chainId,
        vaultAddress,
      });

      return new BigNumber(fromSatoshi(fee));
    },
    enabled: !!chainId && isValidChain(chainId),
  });

  return {
    stakeAndBakeFee,
    isLoading,
    error,
  };
};
