import { Stack, Typography } from '@mui/material';

export const ConfirmationTime = () => {
  return (
    <Stack
      sx={{
        p: theme => theme.spacing(2.5, 2),
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'grey.200',
      }}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography color="text.secondary">Confirmation time</Typography>

      <Typography>~ 60 minutes (6 blocks)</Typography>
    </Stack>
  );
};
