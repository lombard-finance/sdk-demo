import { Box, BoxProps } from '@mui/material';
import { useSpinnerStyles } from './useSpinnerStyles';

type SpinnerProps = Pick<BoxProps, 'sx'> & { size?: number };

export function Spinner({ sx, size = 40 }: SpinnerProps): JSX.Element {
  const { classes } = useSpinnerStyles({ size });

  return <Box sx={sx} component="i" className={classes.root} />;
}
