'use client';

type BedBathSqFeetProps = {
  beds: number | string;
  baths: number | string;
  square_feet: number | string;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
};

const BedBathSqFeet = ({
  beds,
  baths,
  square_feet,
  handleChange,
}: BedBathSqFeetProps) => {
  return (
    <div className='mb-4 flex flex-wrap'>
      <div className='w-full sm:w-1/3 pr-2'>
        <label htmlFor='beds' className='block text-gray-700 font-bold mb-2'>
          Beds
        </label>
        <input
          type='number'
          id='beds'
          name='beds'
          className='border rounded w-full py-2 px-3'
          required
          defaultValue={beds}
          onChange={handleChange}
        />
      </div>
      <div className='w-full sm:w-1/3 px-2'>
        <label htmlFor='baths' className='block text-gray-700 font-bold mb-2'>
          Baths
        </label>
        <input
          type='number'
          id='baths'
          name='baths'
          className='border rounded w-full py-2 px-3'
          required
          defaultValue={baths}
          onChange={handleChange}
        />
      </div>
      <div className='w-full sm:w-1/3 pl-2'>
        <label
          htmlFor='square_feet'
          className='block text-gray-700 font-bold mb-2'
        >
          Square Feet
        </label>
        <input
          type='number'
          id='square_feet'
          name='square_feet'
          className='border rounded w-full py-2 px-3'
          required
          defaultValue={square_feet}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default BedBathSqFeet;
