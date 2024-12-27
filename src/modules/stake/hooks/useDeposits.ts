import { getDepositsByAddress } from '@lombard.finance/sdk';
import { useQuery } from '@tanstack/react-query';
import { useConnection } from 'modules/auth';

export const useDeposits = () => {
  const { address } = useConnection();
  const { data: deposits, isLoading } = useQuery({
    queryKey: ['deposits', address],
    queryFn: async () => {
      if (!address) return undefined;
      return await getDepositsByAddress({
        address,
        env: 'stage'
      });
    },
    enabled: !!address,
  });

  return {
    deposits,
    isLoading,
  };
};