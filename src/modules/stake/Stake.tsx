import { Stack } from '@mui/material';
import { Layout } from 'modules/common/components/Layout';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { StakeStatuses } from './components/StakeStatuses';
import { StakeTabs } from './components/StakeTabs';

const tabs = [
  { value: '/stake', label: 'Stake' },
  { value: '/stake/stake-and-bake', label: 'Stake & Bake' },
];

export function Stake(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  return (
    <Layout
      left={
        <Stack gap={4}>
          <StakeTabs
            value={location.pathname}
            onChange={handleTabChange}
            options={tabs}
          />
          <Outlet />
        </Stack>
      }
      right={<StakeStatuses />}
    />
  );
}
