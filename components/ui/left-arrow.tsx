import { cn } from '@/lib/utils';
import React from 'react';

type Props = { className?: string };

const LeftArrow = ({ className }: Props) => {
  return (
    <svg
      className={cn('fill-current text-black hover:text-rose-700', className)}
      xmlns='http://www.w3.org/2000/svg'
      width='512'
      height='512'
      data-name='Layer 2'
      viewBox='0 0 512 512'
    >
      <linearGradient
        id='linear-gradient'
        x1='43.95'
        x2='468.05'
        y1='43.95'
        y2='468.05'
        gradientUnits='userSpaceOnUse'
      >
        <stop offset='0' stopColor='#2492ff'></stop>
        <stop offset='1' stopColor='#0043ae'></stop>
      </linearGradient>
      <linearGradient
        id='linear-gradient-2'
        x1='189.44'
        x2='472.3'
        y1='180.94'
        y2='463.8'
        gradientUnits='userSpaceOnUse'
      >
        <stop offset='0' stopOpacity='0.35'></stop>
        <stop offset='1' stopOpacity='0'></stop>
      </linearGradient>
      <g>
        <g data-name='143'>
          <path
            fill='url(#linear-gradient)'
            d='M0 362V150C0 67.2 67.2 0 150 0h212c82.8 0 150 67.2 150 150v212c0 82.8-67.2 150-150 150H150C67.2 512 0 444.8 0 362z'
          ></path>
          <path
            fill='url(#linear-gradient-2)'
            d='M408.45 228.35l-33.87 19.3-125.93-125.93L165.82 256l61.46 134.39L348.89 512H362c82.8 0 150-67.2 150-150v-30.11L408.45 228.34z'
          ></path>
          <path
            fill='#fff'
            d='M227.29 121.61L103.5 245.4c-5.86 5.86-5.86 15.36 0 21.21L227.29 390.4c9.45 9.45 25.61 2.76 25.61-10.61v-53.57c0-3.98-1.58-7.79-4.39-10.61L220.9 288h177c8.28 0 15-6.72 15-15v-34c0-8.28-6.72-15-15-15H220.89l27.61-27.61a15.01 15.01 0 004.39-10.61v-53.57c0-13.36-16.16-20.06-25.61-10.61z'
          ></path>
        </g>
      </g>
    </svg>
  );
};

export default LeftArrow;
