'use client';

import Image from 'next/image';

type PropertyNoMapProps = {};

const PropertyNoMap = () => {
  return (
    <>
      <h3 className='w-full mx-auto text-center text-3xl font-semibold underline '>
        Google Map{' '}
      </h3>
      <Image
        src='/map1.svg'
        alt='map'
        priority
        width={40}
        height={40}
        className='w-auto mx-auto '
      />
    </>
  );
};

export default PropertyNoMap;
