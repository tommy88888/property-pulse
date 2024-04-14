'use client';

import PropertyCard from '@/components/property-card';
import PropertySearchForm from '@/components/property-search-form';
import Spinner from '@/components/spinner';
import Property from '@/models/Property';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

type SearchResultsPageProps = {};

const SearchResultsPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();

  const location = searchParams.get('location');
  const propertyType = searchParams.get('propertyType');

  console.log('🚀 ~ SearchResultsPage ~ properties:', properties);
  useEffect(() => {
    const fetchSearchResult = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`,
          {
            cache: 'no-store',
          }
        );

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResult();
  }, [location, propertyType]);

  return (
    <>
      <section className='bg-blue-700 py-4 '>
        <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8 '>
          <PropertySearchForm />
        </div>
      </section>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className='px-4 py-6'>
          <div className='container-xl lg:container m-auto px-4 py-6'>
            <Link
              href='/properties'
              className='flex items-center text-sky-500 hover:underline mb-3  '
            >
              <FaArrowAltCircleLeft className='mr-2 mb-1' /> Back to Properties
            </Link>
            <h1 className='text-2xl mb-4'>Search Results</h1>
            {properties?.length === 0 ? (
              <div>No saved Property found!</div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {properties.map((prop: Property) => (
                  <PropertyCard key={prop._id} property={prop} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default SearchResultsPage;
