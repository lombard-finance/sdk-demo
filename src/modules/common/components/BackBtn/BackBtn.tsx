import { Box, Button, ButtonProps } from '@mui/material';
import { ArrowLeft } from 'modules/common/icons';
import { Link } from 'react-router-dom';

interface IBackBtnProps extends ButtonProps {
  onClick?: () => void;
  to?: string;
}

export const BackBtn = ({ onClick, to, ...props }: IBackBtnProps) => {
  return (
    <Button
      size="small"
      variant="outlined"
      component={to ? Link : 'button'}
      startIcon={
        <Box
          component={ArrowLeft}
          sx={{
            width: 16,
            height: 16,
          }}
        />
      }
      onClick={onClick}
      to={to}
      {...props}
    >
      Back
    </Button>
  );
};
