'use client';

import PropertyCard from '@/components/property-card';
import Spinner from '@/components/spinner';
import Property from '@/models/Property';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type SavedPropertyPageProps = {};

const SavedPropertyPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const res = await fetch('/api/bookmarks', {
          cache: 'no-store',
        });

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          // console.log(res.statusText);
          toast.error('Failed to fetch saved properties');
        }
      } catch (err) {
        console.log(err);
        toast.error('Failed to fetch saved properties');
      } finally {
        setLoading(false);
      }
    };
    fetchSavedProperties();
  }, []);
  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className='px-4 py-6'>
      <h1 className='px-4 py-6 '>Saved Properties</h1>
      <div className='container-xl lg:container m-auto px-4 py-6'>
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
  );
};

export default SavedPropertyPage;
