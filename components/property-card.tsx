'use client';

import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { GiBathtub, GiBed, GiPencilRuler } from 'react-icons/gi';
import { FcMoneyTransfer } from 'react-icons/fc';
import Link from 'next/link';
import { GrMap } from 'react-icons/gr';
import Property from '@/models/Property';

type PropertyCardProps = {
  property: Property;
};

const PropertyCard = ({ property }: PropertyCardProps) => {
  const getRateDisplay = () => {
    const { rates } = property;

    if (rates.monthly) return `${rates.monthly.toLocaleString()}/mo`;
    if (rates.weekly) return `${rates.weekly.toLocaleString()}/wk`;
    if (rates.nightly) return `${rates.nightly.toLocaleString()}/night`;
  };

  const { rates } = property;

  let propImage;
  if (!property.images) return;
  if (property.images[0] === undefined) {
    propImage = '/no-image.svg';
  } else {
    propImage = property.images[0];
  }

  return (
    <div className='rounded-xl shadow-md relative'>
      <Image
        src={propImage}
        alt='property listing'
        sizes='100vw'
        height={0}
        width={0}
        priority
        className='w-full h-auto rounded-t-xl'
      />
      <div className='p-4'>
        <div className='text-left md:text-center lg:text-left mb-6'>
          <div className='text-gray-600'>
            {property.type} - {property?.owner?.username}{' '}
          </div>
          <h3 className='text-xl font-bold'>{property.name}</h3>
        </div>
        <h3 className='absolute top-[10px] right-[10px] bg-white px-2 py-1 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right'>
          <Accordion type='single' collapsible className='w-full '>
            <AccordionItem value='rates' className='border-0 '>
              <AccordionTrigger className='text-[10px] py-0'>
                Rates
              </AccordionTrigger>
              <AccordionContent className='flex flex-col text-[10px] p-0 font-normal text-right'>
                {rates.monthly && <div>${rates.monthly} /mo</div>}
                {rates.weekly && <div>${rates.weekly} /week</div>}
                {rates.nightly && <div>${rates.nightly} /night</div>}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </h3>
        <div className='flex justify-center gap-4 text-gray-500 mb-4'>
          <p>
            <GiBed className='inline mr-2' />
            <span className='md:hidden lg:inline text-xs'>{property.beds}</span>
          </p>
          <p>
            <GiBathtub className='inline mr-2' />
            <span className='md:hidden lg:inline  text-xs'>
              {property.baths}
            </span>
          </p>
          <p>
            <GiPencilRuler className='inline mr-2' />

            <span className='md:hidden lg:inline  text-xs'>
              {property.square_feet} sqft
            </span>
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
        <div className='border border-gray-100 mb-5' />
        <div className='flex flex-col lg:flex-row justify-between mb-4'>
          <div className='flex items-center align-middle gap-2 mb-4 lg:mb-0'>
            <GrMap className=' text-orange-700' />
            {/* <i className='fa-solid fa-location-dot text-lg text-orange-700' /> */}
            <span className='text-orange-700'>
              {' '}
              {property.location.city} {property.location.state}{' '}
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

export default PropertyCard;
