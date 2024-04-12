'use client';

import useRandomProperties from '@/hooks/use-random-properties';
import PropertyCard from './property-card';
import Property from '@/models/Property';

const HomeProperty = () => {
  const data = useRandomProperties();
  if (!data?.properties) return;

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
          Recent Properties
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {data.properties && data.properties.length === 0 ? (
            <p>No Property found!</p>
          ) : (
            data.properties.map((property: Property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeProperty;
