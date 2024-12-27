import { getLBTCExchangeRate, isValidChain } from '@lombard.finance/sdk';
import { useQuery } from '@tanstack/react-query';

export const useLBTCExchangeRate = (chainId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['lbtcExchangeRate', chainId],
    queryFn: async () => {
      if (isValidChain(chainId)) {
        const { exchangeRate, minAmount } = await getLBTCExchangeRate({
          chainId,
          amount: 1,
        });
        return {
          exchangeRate,
          minAmount,
        };
      }
      return undefined;
    },
    enabled: !!chainId && isValidChain(chainId),
  });

  return {
    exchangeRate: data?.exchangeRate,
    minAmount: data?.minAmount,
    isLoading,
    error,
  };
};
