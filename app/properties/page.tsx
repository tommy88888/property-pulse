'use client';

import PropertyCard from '@/components/property-card';
import PropertySearchForm from '@/components/property-search-form';
import Spinner from '@/components/spinner';

import loading from '../loading';
import useSortProperties from '@/hooks/use-sort-properties';

import Properties from '@/components/properties';

type Props = {
  createdAt: string | number | Date;
};

const PropertiesPage = () => {
  const data = useSortProperties();
  if (!data?.properties) return;
  return (
    <>
      <section className='bg-blue-700 py-4 '>
        <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8 '>
          <PropertySearchForm />
        </div>
      </section>
      <Properties data={data.properties} />
    </>
  );
};

export default PropertiesPage;
