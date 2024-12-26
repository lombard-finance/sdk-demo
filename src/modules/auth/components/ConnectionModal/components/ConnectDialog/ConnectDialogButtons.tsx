import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface IConnectDialogButtonsProps {
  children?: ReactNode;
}

export function ConnectDialogButtons({
  children,
}: IConnectDialogButtonsProps): JSX.Element {
  return <Box sx={{ display: 'grid', gap: 1.5 }}>{children}</Box>;
}
