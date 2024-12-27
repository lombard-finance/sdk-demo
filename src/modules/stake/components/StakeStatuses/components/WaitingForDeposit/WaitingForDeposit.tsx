import { Alert, CircularProgress, Typography } from '@mui/material';

export const WaitingForDeposit = () => {
  return (
    <Alert
      severity="success"
      sx={{
        '.MuiAlert-message': {
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          overflow: 'hidden',
        },
      }}
    >
      <Typography>Waiting for your deposit.</Typography>

      <CircularProgress size={20} color="success" />
    </Alert>
  );
};
