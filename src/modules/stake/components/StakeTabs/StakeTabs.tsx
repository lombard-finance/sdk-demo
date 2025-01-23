import { Stack, Tab, Tabs } from '@mui/material';
import React, { ReactNode } from 'react';

export interface IStakeTabsProps {
  value: string;
  onChange: (event: React.SyntheticEvent, newValue: string) => void;
  options: Array<{
    value?: string | number;
    label: ReactNode;
    disabled?: boolean;
  }>;
  spread?: boolean;
}

export function StakeTabs({
  value,
  onChange,
  options,
  spread,
}: IStakeTabsProps): React.JSX.Element {
  return (
    <Stack
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      gap={1}
      alignItems="center"
      justifyContent="space-between"
    >
      <Tabs
        value={value}
        onChange={(event, newValue) => {
          onChange(event, newValue);
        }}
        sx={{
          p: 0.35,
          gap: 0,
          minHeight: 'auto',
          height: 44,
          width: '100%',

          '& .MuiTab-root': {
            fontSize: 16,
            minWidth: 'auto',
            minHeight: 'auto',
            height: 36,
            ...(spread && { flex: 1 }),
            '&:hover': {
              backgroundColor: theme => theme.palette.background.default,
            },
          },
        }}
      >
        {options.map(option => (
          <Tab
            key={option.value}
            value={option.value}
            label={option.label}
            disabled={option.disabled}
            sx={{
              py: 0,
            }}
          />
        ))}
      </Tabs>
    </Stack>
  );
}
