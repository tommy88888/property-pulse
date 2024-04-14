'use client';

import { ImageType } from '@/type';
import Image from 'next/image';
import { Button } from '../ui/button';
import { FaTimesCircle } from 'react-icons/fa';

type ImagePreviewProps = {
  image: string;
  onRemove: (index: number) => void;
  images: string[];
};

const ImagePreview = ({ image, onRemove, images }: ImagePreviewProps) => {
  return (
    <>
      {image && (
        <Image
          src={image}
          alt='image'
          width={80}
          height={80}
          priority
          className='rounded-md shadow-md w-auto'
        />
      )}
      {/* <Button
        type='button'
        variant='ghost'
        size='icon'
        onClick={() => onRemove(images.indexOf(image))}
        className='relative m-0 p-0 w-0 h-0'
      >
        <FaTimesCircle className='text-rose-500 absolute top-[1px] right-[4px]  rounded-full w-4 h-4 hover:text-rose-600 ' />
      </Button> */}
    </>
  );
};

export default ImagePreview;
