import { useMediaQuery, useTheme } from '@mui/material';

interface IBreakpoints {
  isSmDown: boolean;
  isSmUp: boolean;
  isMdDown: boolean;
  isMdUp: boolean;
  isLgDown: boolean;
  isLgUp: boolean;
  isXlDown: boolean;
  isXlUp: boolean;
}

export const useBreakpoints = (): IBreakpoints => {
  const theme = useTheme();

  return {
    isSmDown: useMediaQuery(theme.breakpoints.down('sm')),
    isSmUp: useMediaQuery(theme.breakpoints.up('sm')),
    isMdDown: useMediaQuery(theme.breakpoints.down('md')),
    isMdUp: useMediaQuery(theme.breakpoints.up('md')),
    isLgDown: useMediaQuery(theme.breakpoints.down('lg')),
    isLgUp: useMediaQuery(theme.breakpoints.up('lg')),
    isXlDown: useMediaQuery(theme.breakpoints.down('xl')),
    isXlUp: useMediaQuery(theme.breakpoints.up('xl')),
  };
};
