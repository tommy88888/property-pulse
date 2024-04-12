'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';

type ImagePickerProps = {
  label: string;
  name: string;
  id: string;
  max: number;
};

const ImagePicker = ({ label, name, id, max }: ImagePickerProps) => {
  const [imgPrev, setImgPrev] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files) throw new Error('No files found');
    // const file = files;

    let newImgPrev: string[] = [];

    const filesArray = Array.from(files);
    for (const file of filesArray) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          const imageURL = e.target.result as string;

          newImgPrev.push(imageURL);
        }
        setImgPrev([...imgPrev, ...newImgPrev]);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <label htmlFor='image'>{label}</label>
      <div className='w-18 h-18 flex flex-row gap-1 rounded-md shadow-md '>
        {!imgPrev && <p>No Image!</p>}
        {imgPrev &&
          imgPrev.map((img, i) => (
            <Image
              key={img}
              src={img}
              alt='image prev'
              width={80}
              height={80}
              className='rounded-md shadow-md '
            />
          ))}
      </div>
      <div>
        <input
          type='file'
          id={id}
          accept='image/*'
          name={name}
          multiple
          max={max}
          onChange={handleImageChange}
        />
        <Button variant='ghost' size='sm'>
          Pick an image
        </Button>
      </div>
    </div>
  );
};

export default ImagePicker;
