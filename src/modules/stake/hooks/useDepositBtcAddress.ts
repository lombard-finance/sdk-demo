import { getDepositBtcAddress, isValidChain } from '@lombard.finance/sdk';
import { useQuery } from '@tanstack/react-query';
import { useConnection } from 'modules/auth';
import { CURRENT_ENV } from 'modules/common/const';

export const useDepositBtcAddress = () => {
  const { address, chainId } = useConnection();

  const {
    data: depositAddress,
    isLoading,
    error,
    refetch: refetchDepositBtcAddress,
  } = useQuery({
    queryKey: ['depositBtcAddress', address, chainId],
    queryFn: async () => {
      if (!address || !chainId || !isValidChain(chainId)) return undefined;

      try {
        return await getDepositBtcAddress({
          address,
          chainId,
          partnerId: '',
          env: CURRENT_ENV,
        });
      } catch (error) {
        console.error('Failed to get deposit BTC address:', error);
        return null;
      }
    },
    enabled: !!address && !!chainId && isValidChain(chainId),
  });

  return {
    depositAddress,
    isLoading,
    error,
    hasAddress: !!depositAddress,
    refetch: refetchDepositBtcAddress,
  };
};
