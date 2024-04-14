'use client';

import { PropertyOptions, PropertyTypes } from '@/lib/helper';
import { OptionsType } from '@/type';

type TypeProps = {
  type: string;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
};

const Type = ({ type, handleChange }: TypeProps) => {
  return (
    <div className='mb-4'>
      <label
        htmlFor='property-type'
        className='block text-gray-700 font-bold mb-2'
      >
        Property Type
      </label>
      <select
        id='type'
        name='type'
        className='border rounded w-full py-2 px-3 text-sm text-gray-700'
        required
        defaultValue={type}
        onChange={handleChange}
      >
        <option value='' disabled className='text-sm '>
          -- Select property type --
        </option>
        {PropertyTypes.map((type, i) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Type;
