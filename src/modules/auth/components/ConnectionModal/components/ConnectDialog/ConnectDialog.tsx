import { Dialog, DialogProps } from '@mui/material';

interface IConnectDialogProps
  extends Omit<DialogProps, 'classes' | 'className' | 'scroll' | 'fullWidth'> {}

export function ConnectDialog({
  children,
  onClose,
  ...restProps
}: IConnectDialogProps): JSX.Element {
  return (
    <Dialog
      {...restProps}
      fullWidth
      onClose={onClose}
      scroll="body"
      PaperProps={{
        sx: {
          p: {
            xs: 2.5,
            sm: 4,
          },
          borderRadius: theme => theme.spacing(1),
          background: theme => theme.palette.common.white,
        },
      }}
    >
      {children}
    </Dialog>
  );
}
