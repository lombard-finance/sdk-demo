import { forwardRef, InputHTMLAttributes } from 'react';

import { useInputBaseStyles } from './useInputBaseStyles';

export interface IInputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  /** If `true`, the input will take up the full width of its container. */
  fullWidth?: boolean;
}

/**
 * Simple input wrapper that provides the basic styles.
 */
export const InputBase = forwardRef<HTMLInputElement, IInputBaseProps>(
  ({ className, fullWidth, ...restProps }, ref) => {
    const { classes, cx } = useInputBaseStyles();

    return (
      <input
        autoComplete="off"
        {...restProps}
        ref={ref}
        className={cx(classes.root, className, fullWidth && classes.fullWidth)}
      />
    );
  },
);

InputBase.displayName = 'InputBase';
