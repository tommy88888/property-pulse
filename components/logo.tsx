'use client';

import Image from 'next/image';

type LogoProps = {
  height?: number;
  width?: number;
};

const Logo = ({ height, width }: LogoProps) => {
  return (
    <Image
      src='/logo.svg'
      alt='Logo'
      height={height || 40}
      width={width || 40}
      priority
      className='h-10 w-auto  p-2 rounded-full bg-sky-600/15 shadow-sm'
    />
  );
};

export default Logo;
