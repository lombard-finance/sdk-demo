import { Box, BoxProps } from '@mui/material';
import { Spinner } from '../Spinner';

interface IQueryLoadingProps extends Pick<BoxProps, 'sx'> {
  isAbsolute?: boolean;
}

export function QueryLoading({
  sx,
  isAbsolute,
}: IQueryLoadingProps): JSX.Element {
  return (
    <Box
      sx={{
        ...sx,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(isAbsolute
          ? {
              position: 'absolute',
              top: 'calc(50% - 20px)',
              left: 'calc(50% - 20px)',
            }
          : {}),
      }}
    >
      <Spinner size={40} />
    </Box>
  );
}
