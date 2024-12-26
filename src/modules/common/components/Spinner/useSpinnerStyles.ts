import { keyframes } from 'tss-react';
import { makeStyles } from 'tss-react/mui';

const anim1 = keyframes(`
  0%    {clip-path: polygon(50% 50%,0       0,  50%   0%,  50%    0%, 50%    0%, 50%    0%, 50%    0% )}
  12.5% {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100%   0%, 100%   0%, 100%   0% )}
  25%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 100% 100%, 100% 100% )}
  50%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
  62.5% {clip-path: polygon(50% 50%,100%    0, 100%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
  75%   {clip-path: polygon(50% 50%,100% 100%, 100% 100%,  100% 100%, 100% 100%, 50%  100%, 0%   100% )}
  100%  {clip-path: polygon(50% 50%,50%  100%,  50% 100%,   50% 100%,  50% 100%, 50%  100%, 0%   100% )}
`);

const anim2 = keyframes(`
  0%    {transform:scaleY(1)  rotate(0deg)}
  49.99%{transform:scaleY(1)  rotate(135deg)}
  50%   {transform:scaleY(-1) rotate(0deg)}
  100%  {transform:scaleY(-1) rotate(-135deg)}
`);

interface Props {
  size: number;
}

export const useSpinnerStyles = makeStyles<Props>()((theme, { size }) => ({
  root: {
    display: 'inline-block',
    color: theme.palette.primary.main,
    width: size,
    aspectRatio: '1',
    borderRadius: '50%',
    border: `${size * 0.1}px solid currentColor`,
    animation: `${anim1} 0.8s infinite linear alternate, ${anim2} 1.6s infinite linear`,
  },
}));
