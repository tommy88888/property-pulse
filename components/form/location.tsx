'use client';

import { Location as Loc } from '@/type';

type LocationProps = {
  location: Loc;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
};

const Location = ({ location, handleChange }: LocationProps) => {
  return (
    <div className='mb-4 bg-blue-50 p-4'>
      <label className='block text-gray-700 font-bold mb-2'>Location</label>
      <input
        type='text'
        id='street'
        name='location.street'
        className='border rounded w-full py-2 px-3 mb-2'
        placeholder='Street'
        defaultValue={location.street}
        onChange={handleChange}
      />
      <input
        type='text'
        id='city'
        name='location.city'
        className='border rounded w-full py-2 px-3 mb-2'
        placeholder='City'
        required
        defaultValue={location.city}
        onChange={handleChange}
      />
      <input
        type='text'
        id='state'
        name='location.state'
        className='border rounded w-full py-2 px-3 mb-2'
        placeholder='State'
        required
        defaultValue={location.state}
        onChange={handleChange}
      />
      <input
        type='text'
        id='zipcode'
        name='location.zipcode'
        className='border rounded w-full py-2 px-3 mb-2'
        placeholder='Zipcode'
        defaultValue={location.zipcode}
        onChange={handleChange}
      />
    </div>
  );
};

export default Location;
