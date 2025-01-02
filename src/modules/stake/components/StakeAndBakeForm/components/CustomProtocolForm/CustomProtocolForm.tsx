import { Stack, TextField, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

export const CustomProtocolForm = () => {
  const { register } = useFormContext();

  return (
    <Stack
      gap={2}
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: '#E6E6E9',
        borderRadius: 1,
      }}
    >
      <Stack gap={1}>
        <Typography fontWeight={500}>Spender</Typography>
        <TextField
          {...register('spender', { required: true })}
          placeholder="Enter spender"
          fullWidth
          required
        />
      </Stack>
      <Stack gap={1}>
        <Typography fontWeight={500}>Contract address</Typography>
        <TextField
          {...register('verifyingContract', { required: true })}
          placeholder="Enter contract address"
          fullWidth
          disabled
          helperText="This is the LBTC token contract address for the selected chain"
        />
      </Stack>
    </Stack>
  );
};
