'use client';

import MapMarker from './ui/map-marker';
import XButton from './ui/x-button';
import { GiBathtub, GiBed, GiPencilRuler } from 'react-icons/gi';
import { FcCheckmark } from 'react-icons/fc';
import PropertyMap from './property-map';
import PropertyNoMap from './property-no-map';
import Property from '@/models/Property';

type PropertyDetailsProps = {
  property: Property;
};

const PropertyDetails = ({ property }: PropertyDetailsProps) => {
  return (
    <main>
      <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
        <div className='text-gray-500 mb-4'>{property.type}</div>
        <h1 className='text-3xl font-bold mb-4'>{property.name}</h1>
        <div className='text-gray-500 mb-4 flex align-middle justify-center md:justify-start'>
          <MapMarker className='text-lg text-orange-700 mr-2 w-5 h-5' />

          <p className='text-orange-700'>
            {property.location.street}, {property.location.city}{' '}
            {property.location.state}
          </p>
        </div>
        <h3 className='text-lg font-bold my-6 bg-gray-800 text-white p-2'>
          Rates &amp; Options
        </h3>
        <div className='flex flex-col md:flex-row justify-around'>
          <div className='flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0'>
            <div className='text-gray-500 mr-2 font-bold'>Nightly</div>
            <div className='text-2xl font-bold text-blue-500'>
              {property.rates.nightly ? (
                `$${property.rates.nightly.toLocaleString()}`
              ) : (
                <XButton className=' text-red-700/30 w-5 h-5 shadow-sm' />
              )}
            </div>
          </div>
          <div className='flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0'>
            <div className='text-gray-500 mr-2 font-bold'>Weekly</div>
            <div className='text-2xl font-bold text-blue-500'>
              {property.rates.weekly ? (
                `$${property.rates.weekly.toLocaleString()}`
              ) : (
                <XButton className=' text-red-700/30 w-5 h-5 shadow-sm' />
              )}
            </div>
          </div>
          <div className='flex items-center justify-center mb-4 pb-4 md:pb-0'>
            <div className='text-gray-500 mr-2 font-bold'>Monthly</div>
            <div className='text-2xl font-bold text-blue-500'>
              {property.rates.monthly ? (
                `$${property.rates.monthly.toLocaleString()}`
              ) : (
                <XButton className=' text-red-700/30 w-5 h-5 shadow-sm' />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
        <h3 className='text-lg font-bold mb-6'>Description &amp; Details</h3>
        <div className='flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9'>
          <p>
            <GiBed className='inline mr-2' />
            {property.beds}
            <span className='hidden sm:inline'> Beds</span>
          </p>
          <p>
            <GiBathtub className='inline mr-2' /> {property.baths}
            <span className='hidden sm:inline'> Baths</span>
          </p>
          <p>
            <GiPencilRuler className='inline mr-2' />
            {property.square_feet}
            <span className='hidden sm:inline'>sqft</span>
          </p>
        </div>
        <p className='text-gray-500 mb-4 text-center'>{property.description}</p>
        {/* <p className='text-gray-500 mb-4'>
          We have a beautiful apartment located near the commons. It is a 2
          bedroom apartment with a full kitchen and bathroom. It is available
          for weekly or monthly rentals.
        </p> */}
      </div>
      <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
        <h3 className='text-lg font-bold mb-6'>Amenities</h3>
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none space-y-2'>
          {property.amenities.map((am, i) => (
            <li key={i} className='flex flex-row items-center '>
              <FcCheckmark className='text-green-600 mr-2  inline-block' /> {am}
            </li>
          ))}
        </ul>
      </div>
      <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
        <PropertyNoMap />
        {/* <PropertyMap property={property} /> */}
      </div>
    </main>
  );
};

export default PropertyDetails;
