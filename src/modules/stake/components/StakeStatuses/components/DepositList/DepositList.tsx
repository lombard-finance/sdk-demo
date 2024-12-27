import { IDeposit } from '@lombard.finance/sdk';
import {
  Alert,
  Stack,
  Typography,
} from '@mui/material';
import { useDeposits } from '../../../../hooks/useDeposits';
import { DepositCard } from './DepositCard';

export const DepositList = () => {
  const { deposits, isLoading } = useDeposits();

  if (isLoading) {
    return (
      <Alert severity="success">
        <Typography>Loading deposits...</Typography>
      </Alert>
    );
  }

  if (!deposits?.length) {
    return (
      <Alert severity="success">
        <Typography>No deposits found.</Typography>
      </Alert>
    );
  }

  return (
    <Stack gap={2}>
      {deposits.map((deposit: IDeposit) => (
        <DepositCard key={deposit.txid} deposit={deposit} />
      ))}
    </Stack>
  );
};
