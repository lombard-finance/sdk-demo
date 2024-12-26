import { Alert } from '@mui/material';

interface IErrorAlert {
  action?: {
    label: string;
    onClick: () => void;
  };
  errorMessage?: string;
}

export const ErrorAlert = ({ errorMessage }: IErrorAlert) => {
  if (!errorMessage) {
    return null;
  }

  return (
    <Alert severity="error" variant="filled">
      {errorMessage}
    </Alert>
  );
};
