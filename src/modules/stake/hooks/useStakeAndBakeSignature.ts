import {
  getUserStakeAndBakeSignature,
  isValidChain,
} from '@lombard.finance/sdk';
import { useQuery } from '@tanstack/react-query';
import { useConnection } from 'modules/auth/hooks/useConnection';
import { CURRENT_ENV } from 'modules/common/const';

export const useStakeAndBakeSignature = () => {
  const { address, chainId } = useConnection();

  const {
    data: signature,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['stakeAndBakeSignature', address],
    queryFn: async () => {
      if (!address || !chainId || !isValidChain(chainId)) return undefined;

      return await getUserStakeAndBakeSignature({
        userDestinationAddress: address,
        chainId,
        env: CURRENT_ENV,
      });
    },
    enabled: !!address,
  });

  return {
    signature: signature?.signature,
    expirationDate: signature?.expirationDate
      ? new Date(Number(signature.expirationDate) * 1000)
      : undefined,
    isLoading,
    refetch,
  };
};
