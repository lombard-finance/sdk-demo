import { Stack } from '@mui/material';
import { useDepositBtcAddress } from '../../hooks/useDepositBtcAddress';
import { DepositList } from './components/DepositList';
import { WaitingForDeposit } from './components/WaitingForDeposit';
import { ReactNode } from 'react';
import { useConnection } from 'modules/auth';

interface IStakeStatusesProps {
  content?: ReactNode;
}

export const StakeStatuses = ({ content }: IStakeStatusesProps) => {
  const { isConnected } = useConnection();
  const { depositAddress } = useDepositBtcAddress();

  return (
    <Stack gap={2}>
      {content}
      {isConnected && (
        <>{depositAddress ? <DepositList /> : <WaitingForDeposit />}</>
      )}
    </Stack>
  );
};
