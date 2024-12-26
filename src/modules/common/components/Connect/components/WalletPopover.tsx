import { Button, Popover, Stack, Typography } from '@mui/material';

interface WalletPopoverProps {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  address: string;
  onClose: () => void;
  onDisconnect: () => void;
}

export const WalletPopover = ({
  open,
  anchorEl,
  address,
  onClose,
  onDisconnect,
}: WalletPopoverProps) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Stack p={2} spacing={1}>
        <Typography variant="body2" color="text.secondary">
          Connected Address
        </Typography>
        <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
          {address}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={onDisconnect}
        >
          Disconnect
        </Button>
      </Stack>
    </Popover>
  );
};