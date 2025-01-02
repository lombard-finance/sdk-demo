import { Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface ISummaryItemProps {
  label: ReactNode;
  value: ReactNode;
}

export const SummaryItem = ({ label, value }: ISummaryItemProps) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap={1}
    >
      <Typography
        sx={{
          whiteSpace: 'nowrap',
        }}
        color="text.secondary"
      >
        {label}
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        gap={1}
        sx={{
          overflow: 'hidden',
        }}
      >
        {value}
      </Stack>
    </Stack>
  );
};
