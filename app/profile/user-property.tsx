'use client';

import Property from '@/models/Property';
import Image from 'next/image';
import Link from 'next/link';

type UserPropertyProps = {
  property: Property;
  handleDeleteProperty: (property: Property) => void;
};

const UserProperty = ({
  property,
  handleDeleteProperty,
}: UserPropertyProps) => {
  let propImage;
  if (!property.images) return;
  if (property.images[0] === undefined) {
    propImage = '/no-image.svg';
  } else {
    propImage = property.images[0];
  }

  return (
    <div className='mb-10'>
      <Link href={`/properties/${property._id}`}>
        <Image
          className='h-32 w-full rounded-md object-cover'
          src={propImage}
          width={0}
          height={0}
          priority
          sizes='100vw'
          alt='Property 1'
        />
      </Link>
      <div className='mt-2'>
        <p className='text-lg font-semibold'>{property.name}</p>
        <p className='text-gray-600'>
          {property.location.street} {property.location.city}{' '}
          {property.location.state}{' '}
        </p>
      </div>
      <div className='mt-2'>
        <Link
          href={`/properties/${property._id}/edit`}
          className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'
        >
          Edit
        </Link>
        <button
          onClick={() => handleDeleteProperty(property)}
          className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
          type='button'
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserProperty;
