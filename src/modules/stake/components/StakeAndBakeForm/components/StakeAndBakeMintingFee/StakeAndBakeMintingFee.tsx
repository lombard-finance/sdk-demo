import { CircularProgress, Stack, Typography } from '@mui/material';
import { LBTCIcon } from 'modules/common/icons';
import { useMemo } from 'react';
import { getSelectedVault } from 'modules/stake/utils/getSelectedVault';
import { useStakeAndBakeFee } from 'modules/stake/hooks/useStakeAndBakeFee';

interface StakeAndBakeMintingFeeFeeProps {
  chainId: number;
  vaultKey: string;
}

export const StakeAndBakeMintingFee = ({
  chainId,
  vaultKey,
}: StakeAndBakeMintingFeeFeeProps) => {
  const selectedVault = useMemo(
    () => getSelectedVault(chainId, vaultKey),
    [chainId, vaultKey],
  );

  const {
    stakeAndBakeFee = '',
    isLoading,
    error,
  } = useStakeAndBakeFee(chainId, selectedVault?.address || '');

  return (
    <Stack
      sx={{
        backgroundColor: 'background.default',
        p: 1.5,
        borderRadius: 1,
      }}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography color="customMain.600">Network fee for minting</Typography>

      {isLoading ? (
        <CircularProgress size={16} />
      ) : error ? (
        <Typography>Error loading fee</Typography>
      ) : (
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography>{stakeAndBakeFee?.toString() || '0'} LBTC</Typography>
          <LBTCIcon height={20} width={20} />
        </Stack>
      )}
    </Stack>
  );
};
