'use client';
import Image from 'next/image';

type PropertyHeaderImageProps = {
  image: string;
};

const PropertyHeaderImage = ({ image }: PropertyHeaderImageProps) => {
  let propImage;
  if (!image && image === undefined) {
    propImage = '/no-image.svg';
  } else {
    propImage = image;
  }
  return (
    <section>
      <div className='container-xl m-auto'>
        <div className='grid grid-cols-1'>
          <Image
            src={propImage}
            alt='property'
            className='object-cover h-[400px] w-full'
            width={0}
            height={0}
            sizes='100vw'
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
