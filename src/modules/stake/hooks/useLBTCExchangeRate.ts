import { getLBTCExchangeRate, isValidChain } from '@lombard.finance/sdk';
import { useQuery } from '@tanstack/react-query';
import { CURRENT_ENV } from 'modules/common/const';

export const useLBTCExchangeRate = (chainId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['lbtcExchangeRate', chainId],
    queryFn: async () => {
      if (isValidChain(chainId)) {
        const { exchangeRate, minAmount } = await getLBTCExchangeRate({
          chainId,
          amount: 1,
          env: CURRENT_ENV,
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
