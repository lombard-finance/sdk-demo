import { ButtonProps, IconButton } from '@mui/material';
import { CheckIcon, CopyIcon } from 'modules/common/icons';
import { useState } from 'react';

interface CopyButtonProps extends ButtonProps {
  text: string;
  successDuration?: number;
}

export const CopyButton = ({
  text,
  successDuration = 2000,
  ...buttonProps
}: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, successDuration);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <IconButton onClick={handleCopy} size="small" {...buttonProps}>
      {isCopied ? (
        <CheckIcon width={16} height={16} />
      ) : (
        <CopyIcon width={16} height={16} />
      )}
    </IconButton>
  );
};
