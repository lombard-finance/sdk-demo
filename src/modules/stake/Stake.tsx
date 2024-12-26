import { Stack } from '@mui/material';
import { Layout } from 'modules/common/components/Layout';
import { useState } from 'react';
import { StakeForm } from './components/StakeForm';
import { StakeStatuses } from './components/StakeStatuses';
import { StakeTabs } from './components/StakeTabs';

const tabs = [
  { value: '/', label: 'Stake' },
  { value: 'stake-and-bake', label: 'Stake & Bake', disabled: true },
];

export function Stake(): JSX.Element {
  const [value, setValue] = useState<string>('/');

  return (
    <Layout
      left={
        <Stack gap={4}>
          <StakeTabs
            value={value}
            onChange={(_, newValue) => setValue(newValue)}
            options={tabs}
          />
          <StakeForm />
        </Stack>
      }
      right={<StakeStatuses />}
    />
  );
}
