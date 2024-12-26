import { Stack, Typography } from '@mui/material';

export const StakeStatuses = () => {
  return (
    <Stack gap={2}>
      <Typography variant="h6">Stakes</Typography>
      <Typography color="text.secondary">Status of BTC stake.</Typography>
    </Stack>
  );
};
