import { Box, SxProps, Theme, Tooltip, TooltipProps } from '@mui/material';
import { InfoIcon } from 'modules/common/icons';
import { ReactNode } from 'react';

const OFFSET = 0.75;

interface IInfoIconWithTooltipProps extends Pick<TooltipProps, 'placement'> {
  children?: ReactNode;
  sx?: SxProps<Theme>;
  withoutOffset?: boolean;
}

export function InfoIconWithTooltip({
  children,
  sx,
  placement,
  withoutOffset,
}: IInfoIconWithTooltipProps): JSX.Element {
  return (
    <Tooltip placement={placement} title={children}>
      <Box
        component="i"
        sx={{
          fontSize: theme => theme.typography.pxToRem(14),
          display: 'inline-flex',
          p: theme => theme.spacing(OFFSET),
          m: theme => theme.spacing(-OFFSET),
          ml: withoutOffset ? undefined : '0',
          ...sx,
        }}
      >
        <Box
          component={InfoIcon}
          sx={{
            width: '1em',
            height: '1em',
          }}
        />
      </Box>
    </Tooltip>
  );
}
