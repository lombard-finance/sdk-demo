import { Stack } from '@mui/material';
import { useConnection } from 'modules/auth';
import { Connect } from 'modules/common/components/Connect';
import { PropsWithChildren } from 'react';

interface FormConnectionGuardProps extends PropsWithChildren {}

export const FormConnectionGuard = ({ children }: FormConnectionGuardProps) => {
  const { isConnected } = useConnection();

  if (isConnected) {
    return children;
  }

  return (
    <Stack direction="row" alignItems="center">
      <Connect size="large" sx={{ width: '100%' }}>
        Connect wallet
      </Connect>
    </Stack>
  );
};
