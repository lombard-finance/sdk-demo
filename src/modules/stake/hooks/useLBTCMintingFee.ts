import { getLBTCMintingFee, isValidChain } from '@lombard.finance/sdk';
import { useQuery } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import { isEthereumChain } from '../utils/isEthereumChain';

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

      if (isEthereumChain(chainId)) {
        return await getLBTCMintingFee({
          chainId,
        });
      }

      return BigNumber(0);
    },
    enabled: !!chainId && isValidChain(chainId),
  });

  return {
    networkFee,
    isLoading,
    error,
  };
};
