import { getDepositsByAddress } from '@lombard.finance/sdk';
import { useQuery } from '@tanstack/react-query';
import { useConnection } from 'modules/auth';
import { CURRENT_ENV } from 'modules/common/const';

export const useDeposits = () => {
  const { address, chainId } = useConnection();
  const { data: deposits, isLoading } = useQuery({
    queryKey: ['deposits', address],
    queryFn: async () => {
      if (!address) return undefined;

      const deposits = await getDepositsByAddress({
        address,
        env: CURRENT_ENV,
      });

      return deposits?.sort((a, b) =>
        b.chainId === chainId ? 1 : a.chainId === chainId ? -1 : 0,
      );
    },
    enabled: !!address,
  });

  return {
    deposits,
    isLoading,
  };
};
