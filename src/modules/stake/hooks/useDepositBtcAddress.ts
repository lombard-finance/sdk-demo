import { getDepositBtcAddress, isValidChain } from '@lombard.finance/sdk';
import { useQuery } from '@tanstack/react-query';
import { useConnection } from 'modules/auth';

export const useDepositBtcAddress = () => {
  const { address, chainId } = useConnection();

  const {
    data: depositAddress,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['depositBtcAddress', address, chainId],
    queryFn: async () => {
      if (!address || !chainId || !isValidChain(chainId)) return undefined;

      return await getDepositBtcAddress({
        address,
        chainId,
        partnerId: '',
      });
    },
    enabled: !!address && !!chainId && isValidChain(chainId),
  });

  return {
    depositAddress,
    isLoading,
    error,
    hasAddress: !!depositAddress,
  };
};
