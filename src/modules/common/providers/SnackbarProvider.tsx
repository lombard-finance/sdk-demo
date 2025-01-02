import { SnackbarProvider as NotistackProvider } from 'notistack';

export const SnackbarProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <NotistackProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      autoHideDuration={3000}
      style={{ marginBottom: '20px' }}
    >
      {children}
    </NotistackProvider>
  );
};