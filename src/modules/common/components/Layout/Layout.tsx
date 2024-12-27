import { Container } from '@mui/material';

import { Stack } from '@mui/material';
import { Header } from '../Header';

interface LayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export function Layout({ left, right }: LayoutProps): JSX.Element {
  return (
    <Stack
      direction={{
        xs: 'column',
        lg: 'row',
      }}
      height="100vh"
    >
      <Stack
        height="100%"
        flex={{
          xs: 0,
          lg: 1,
        }}
        sx={{ backgroundColor: 'background.default' }}
      >
        <Header />
        <Container maxWidth="sm" sx={{ py: 5 }}>
          {left}
        </Container>
      </Stack>

      <Stack
        height="100%"
        flex={1}
        sx={{ backgroundColor: 'customMain.100', overflowY: 'auto' }}
      >
        <Container
          maxWidth="sm"
          sx={{
            pt: {
              xs: 5,
              lg: 17.5,
            },
            pb: 5,
          }}
        >
          {right}
        </Container>
      </Stack>
    </Stack>
  );
}
