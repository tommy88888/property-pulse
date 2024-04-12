'use client';

import Property from '@/models/Property';
import PropertyCard from './property-card';
import { useEffect, useState } from 'react';
import Spinner from './spinner';
import Pagination from './pagination';

type PropertyProps = {
  data: Property[];
};

const Properties = ({ data }: PropertyProps) => {
  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `/api/properties?page=${page}&pageSize=${pageSize}`
        );

        if (!res.ok) throw new Error('Failed to fetch data');

        const data = await res.json();

        setProperties(data.properties);
        setTotalItems(data.totalProperties);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [page, pageSize]);

  if (!data || data === undefined) return;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {properties?.length === 0 ? (
          <div>No Property found!</div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties?.map((prop: Property) => (
              <PropertyCard key={prop._id} property={prop} />
            ))}
          </div>
        )}
        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default Properties;
