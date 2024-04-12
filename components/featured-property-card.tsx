'use client';

import Property from '@/models/Property';
import Image from 'next/image';
import { GiBathtub, GiBed, GiPencilRuler } from 'react-icons/gi';
import { FcMoneyTransfer } from 'react-icons/fc';
import Link from 'next/link';
import { GrMap } from 'react-icons/gr';

type FeaturedPropertyCardProps = {
  property: Property;
};

const FeaturedPropertyCard = ({ property }: FeaturedPropertyCardProps) => {
  const { rates } = property;
  const getRateDisplay = () => {
    if (rates.monthly) return `${rates.monthly.toLocaleString()}/mo`;
    if (rates.weekly) return `${rates.weekly.toLocaleString()}/wk`;
    if (rates.nightly) return `${rates.nightly.toLocaleString()}/night`;
  };
  return (
    <div className='bg-white rounded-xl shadow-md relative flex flex-col md:flex-row'>
      <Image
        src={property.images[0]}
        alt='feature images'
        width={1800}
        height={400}
        sizes='100vw'
        className='object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5'
      />
      <div className='p-6'>
        <h3 className='text-xl font-bold'>Seaside Retreat</h3>
        <div className='text-gray-600 mb-4'>Condo</div>
        <h3 className='absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right'>
          ${getRateDisplay()}
        </h3>
        <div className='flex justify-center gap-4 text-gray-500 mb-4'>
          <p>
            <GiBed className='inline-block mr-2' /> {property.beds}
            <span className='md:hidden lg:inline'> Beds</span>
          </p>
          <p>
            <GiBathtub className='inline-block mr-2' />
            {property.baths}
            <span className='md:hidden lg:inline'> Baths</span>
          </p>
          <p>
            <GiPencilRuler className='inline-block mr-2' />
            {property.square_feet}{' '}
            <span className='md:hidden lg:inline'>sqft</span>
          </p>
        </div>
        <div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
          {rates.weekly && (
            <p className='flex flex-row items-center text-xs'>
              <FcMoneyTransfer /> Weekly
            </p>
          )}
          {rates.monthly && (
            <p className='flex flex-row items-center text-xs'>
              <FcMoneyTransfer /> Monthly
            </p>
          )}
          {rates.nightly && (
            <p className='flex flex-row items-center text-xs'>
              <FcMoneyTransfer /> Nightly
            </p>
          )}
        </div>
        <div className='border border-gray-200 mb-5' />
        <div className='flex flex-col lg:flex-row justify-between'>
          <div className='flex align-middle gap-2 mb-4 lg:mb-0'>
            <GrMap className=' text-orange-700' />
            <span className='text-orange-700'>
              {property.location.city} {property.location.state}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className='h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm'
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPropertyCard;
