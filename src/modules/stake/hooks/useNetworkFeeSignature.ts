import { getNetworkFeeSignature, isValidChain } from '@lombard.finance/sdk';
import { useQuery } from '@tanstack/react-query';
import { useConnection } from 'modules/auth';
import { CURRENT_ENV } from 'modules/common/const';

export const useNetworkFeeSignature = () => {
  const { address, chainId } = useConnection();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['networkFeeSignature', address, chainId],
    queryFn: async () => {
      if (!address || !chainId || !isValidChain(chainId)) return undefined;

      return await getNetworkFeeSignature({
        address,
        chainId,
        env: CURRENT_ENV,
      });
    },
    enabled: !!address && !!chainId && isValidChain(chainId),
  });

  return {
    hasSignature: data?.hasSignature ?? false,
    isExpired: data?.isDelayed ?? false,
    expirationDate: data?.expirationDate
      ? new Date(Number(data.expirationDate) * 1000)
      : undefined,
    isLoading,
    refetch,
  };
};
