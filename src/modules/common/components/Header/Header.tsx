import { Box, ButtonBase, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Connect } from '../Connect';
import { Logo } from '../Logo';

const HOME_PATH = '/';

export function Header(): JSX.Element {
  return (
    <Stack
      component="header"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        padding: theme => theme.spacing(1.5, 2.5),
      }}
    >
      <ButtonBase
        to={HOME_PATH}
        component={Link}
        sx={{
          gap: 1,
        }}
      >
        <Box
          component={Logo}
          sx={{
            height: {
              xs: 22,
              md: 28,
            },
          }}
        />

        <Typography variant="body2" color="text.secondary" whiteSpace="nowrap">
          Staking SDK Demo
        </Typography>
      </ButtonBase>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        gap={2}
        sx={{ width: '100%' }}
      >
        <Connect />
      </Stack>
    </Stack>
  );
}
