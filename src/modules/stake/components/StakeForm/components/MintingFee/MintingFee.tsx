import { CircularProgress, Stack, Typography } from '@mui/material';
import { LBTCIcon } from 'modules/common/icons';
import { useLBTCMintingFee } from '../../../../hooks/useLBTCMintingFee';

interface MintingFeeProps {
  chainId: number;
}

export const MintingFee = ({ chainId }: MintingFeeProps) => {
  const { networkFee, isLoading, error } = useLBTCMintingFee(chainId);

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
          <Typography>{networkFee?.toFixed() || '0'} LBTC</Typography>
          <LBTCIcon height={20} width={20} />
        </Stack>
      )}
    </Stack>
  );
};
