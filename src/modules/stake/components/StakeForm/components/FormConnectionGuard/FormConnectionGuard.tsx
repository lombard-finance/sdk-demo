import { Stack } from '@mui/material';
import { useConnection } from 'modules/auth';
import { NetworkGuard } from 'modules/auth/components/NetworkGuard/NetworkGuard';
import { BtcAmountField } from 'modules/common/components/BtcAmountField';
import { Connect } from 'modules/common/components/Connect';
import { PropsWithChildren } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface FormConnectionGuardProps extends PropsWithChildren {
  methods: UseFormReturn<any>;
}

export const FormConnectionGuard = ({
  children,
  methods,
}: FormConnectionGuardProps) => {
  const { isConnected } = useConnection();

  if (!isConnected) {
    return (
      <Stack gap={3}>
        <BtcAmountField control={methods.control} minAmount={0} />

        <Connect size="large" sx={{ width: '100%' }}>
          Connect wallet
        </Connect>
      </Stack>
    );
  }

  return <NetworkGuard>{children}</NetworkGuard>;
};
