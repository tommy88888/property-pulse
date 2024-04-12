'use client';

import Image from 'next/image';

type LogoProps = {};

const Logo = () => {
  return (
    <Image
      src='/logo.svg'
      alt='Logo'
      height={130}
      width={130}
      className='w-auto'
      priority
    />
  );
};

export default Logo;
