import { Stack, Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import { BTCIcon, LBTCIcon } from 'modules/common/icons';
import { useLBTCExchangeRate } from '../../../../hooks/useLBTCExchangeRate';
import { useLBTCMintingFee } from '../../../../hooks/useLBTCMintingFee';

interface StakingSummaryProps {
  chainId: number;
  amount: string | number;
}

export const StakingSummary = ({ chainId, amount }: StakingSummaryProps) => {
  const {
    exchangeRate,
    isLoading: isLoadingRate,
  } = useLBTCExchangeRate(chainId);
  const { networkFee, isLoading: isLoadingFee } = useLBTCMintingFee(chainId);

  const isLoading = isLoadingRate || isLoadingFee;
  const btcAmount = new BigNumber(amount || '0');

  const expectedLBTC = btcAmount
    .multipliedBy(exchangeRate || 1)
    .minus(networkFee || 0);

  return (
    <Stack gap={1}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography color="text.secondary">You are staking</Typography>
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography>{btcAmount.toFixed()} BTC</Typography>
          <BTCIcon height={20} width={20} />
        </Stack>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography color="text.secondary">You will receive</Typography>
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography>
            {isLoading
              ? '...'
              : expectedLBTC.isGreaterThan(0)
                ? expectedLBTC.toFixed()
                : '0'}{' '}
            LBTC
          </Typography>
          <LBTCIcon height={20} width={20} />
        </Stack>
      </Stack>
    </Stack>
  );
};
