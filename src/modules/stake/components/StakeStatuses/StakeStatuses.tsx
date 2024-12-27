import { Stack, Typography } from '@mui/material';
import { useConnection } from 'modules/auth';
import { useDepositBtcAddress } from '../../hooks/useDepositBtcAddress';
import { DepositList } from './components/DepositList';
import { WaitingForDeposit } from './components/WaitingForDeposit';

export const StakeStatuses = () => {
  const { isConnected } = useConnection();
  const { depositAddress } = useDepositBtcAddress();

  if (!isConnected) {
    return null;
  }

  return (
    <Stack gap={2}>
      <Typography variant="h6">Stakes</Typography>
      <Typography color="text.secondary">Status of BTC stake.</Typography>

      {depositAddress ? <DepositList /> : <WaitingForDeposit />}
    </Stack>
  );
};
