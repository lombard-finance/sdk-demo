import {
  Box,
  Button,
  ButtonProps,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { useTranslation } from 'modules/i18n';
import React from 'react';
import { translation } from './translation';

export interface IConnectButtonProps extends ButtonProps {
  title: string;
  subtitle?: string;
  withInstallLabel?: boolean;
  iconSlot: React.ReactNode;
  isDisabled?: boolean;
  isLoading?: boolean;
  onSuccess?: () => void;
}

export const ConnectButton = ({
  title,
  subtitle,
  withInstallLabel,
  iconSlot,
  isDisabled,
  isLoading,
  ...rest
}: IConnectButtonProps) => {
  const { t, keys } = useTranslation(translation);

  return (
    <Button
      {...rest}
      size="large"
      variant="text"
      fullWidth
      sx={{
        borderRadius: 1,
        border: `1px solid`,
        borderColor: 'grey.200',
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'none',
          borderColor: 'customMain.800',
          boxShadow: '0px 0px 0px 4px #1B5B5B1A',
        },
        height: 80,
        padding: theme => theme.spacing(0, 3.5),
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      startIcon={
        isLoading ? (
          <CircularProgress color="inherit" size="0.85em" />
        ) : (
          <Box
            component="i"
            sx={{
              display: 'flex',
              fontSize: theme => theme.typography.pxToRem(36),
              opacity: isDisabled ? 0.7 : 1,
            }}
          >
            {iconSlot}
          </Box>
        )
      }
      disabled={isDisabled}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          width: '100%',
        }}
      >
        <Stack alignItems="flex-start" justifyContent="center" pl={1}>
          <Typography>{title}</Typography>

          {subtitle ? (
            <Typography variant="body2" textAlign="left">
              {subtitle}
            </Typography>
          ) : null}
        </Stack>

        {!withInstallLabel && (
          <Chip
            size="small"
            label={t(keys.detected)}
            color="success"
            disabled={isDisabled}
            sx={{
              display: {
                xs: 'none',
                sm: 'flex',
              },
            }}
          />
        )}
      </Stack>
    </Button>
  );
};
