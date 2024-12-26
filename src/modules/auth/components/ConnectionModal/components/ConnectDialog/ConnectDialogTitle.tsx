import { Stack, Typography } from '@mui/material';

interface IConnectDialogTitleProps {
  title: string;
  description?: string;
}

export function ConnectDialogTitle({
  title,
  description,
}: IConnectDialogTitleProps): JSX.Element {
  return (
    <Stack mb={2}>
      <Typography component="h2" variant="h6">
        {title}
      </Typography>

      {description && (
        <Typography color="text.secondary">{description}</Typography>
      )}
    </Stack>
  );
}
