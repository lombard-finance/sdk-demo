import { getLBTCMintingFee, isValidChain } from '@lombard.finance/sdk';
import { useQuery } from '@tanstack/react-query';

export const useLBTCMintingFee = (chainId: number) => {
  const {
    data: networkFee,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['lbtcMintingFee', chainId],
    queryFn: async () => {
      if (!isValidChain(chainId)) {
        return undefined;
      }

      return await getLBTCMintingFee({
        chainId,
      });
    },
    enabled: !!chainId && isValidChain(chainId),
  });

  return {
    networkFee,
    isLoading,
    error,
  };
};
