'use client';

import { PropertyOptions } from '@/lib/helper';
import { OptionsType } from '@/type';

type SelectPropertyTypeProps = {
  type: OptionsType | 'All';
  setPropertyType: (selectedType: OptionsType) => void;
};

const SelectPropertyType = ({
  type,
  setPropertyType,
}: SelectPropertyTypeProps) => {
  return (
    <div className='w-full md:w-2/5 md:pl-2'>
      <label htmlFor='property-type' className='sr-only'>
        Property Type
      </label>
      <select
        id='property-type'
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        ) => setPropertyType(e.target.value as OptionsType)}
        className='w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500'
      >
        {PropertyOptions.map((opt, i) => (
          <option key={opt.label} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectPropertyType;
