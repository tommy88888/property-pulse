'use client';

import { Gallery, Item } from 'react-photoswipe-gallery';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { open } from 'fs';

type PropertyImagesProps = {
  images: string[];
};

const PropertyImages = ({ images }: PropertyImagesProps) => {
  let propImage;
  if (images[0] === undefined) {
    propImage = '/no-image.svg';
  } else {
    propImage = images[0];
  }
  return (
    <Gallery>
      <section className='bg-sky-50 p-4 '>
        <div className='container mx-auto '>
          {images.length === 1 ? (
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width='1000'
              height='600'
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={propImage}
                  alt='property'
                  className='object-cover h-[400px] mx-auto'
                  width={1800}
                  height={400}
                  // sizes='100vw'
                  priority
                />
              )}
            </Item>
          ) : (
            <div className='grid grid-cols-2 gap-4 '>
              {images.map((image, index) => (
                <div
                  key={index}
                  className={cn(
                    images.length === 3 && index === 2
                      ? 'col-span-2'
                      : 'col-span-1'
                  )}
                >
                  <Item
                    original={image}
                    thumbnail={image}
                    width='1000'
                    height='600'
                  >
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={image}
                        alt='property detail'
                        className='object-cover h-[400px] w-full rounded-xl '
                        width={0}
                        height={0}
                        sizes='100vw'
                        priority
                        style={{ width: 'auto' }}
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
};

export default PropertyImages;
