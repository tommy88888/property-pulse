'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getProperty } from '@/actions/get-property';
import PropertyHeaderImage from '@/components/property-header-image';

import Link from 'next/link';
import PropertyDetails from '@/components/property-details';
import LeftArrow from '@/components/ui/left-arrow';

import Spinner from '@/components/spinner';
import { FcLeft } from 'react-icons/fc';
import PropertyImages from '@/components/property-images';
import BookmarkButton from '@/components/bookmark-button';
import ShareButtons from '@/components/share-buttons';
import PropertyContactForm from '@/components/property-contact-form';
import Property from '@/models/Property';

type PropertyIdPageProps = {
  id: string;
};

const PropertyIdPage = () => {
  const { id } = useParams<PropertyIdPageProps>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return [];

      try {
        const res = await getProperty(id);
        setProperty(res);
      } catch (err) {
        console.error('Error fetching property:', err);
      } finally {
        setLoading(false);
      }
    };
    if (property === null) {
      fetchPropertyData();
    }
  }, [property, id]);
  // if (!property && !loading) {
  //   return (
  //     <h1 className='text-center text-2xl font-bold mt-10 '>
  //       Property Not Found
  //     </h1>
  //   );
  // }

  const data = property;
  if (!data) return [];
  if ('images' in data) {
  }

  let propImage;
  if (!property.images) return;
  if (property.images[0] === undefined) {
    propImage = [];
  } else {
    propImage = property.images[0];
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />

          <section>
            <div className='container m-auto py-6 px-6'>
              <Link
                href='/properties'
                className='text-blue-500 hover:text-blue-600 flex items-center'
              >
                <FcLeft className='mr-2 w-5 h-5 text-sky-500 hover:text-sky-500/80' />
                Back to Properties
              </Link>
            </div>
          </section>

          <section className='bg-blue-50'>
            <div className='container m-auto py-10 px-6'>
              <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
                <PropertyDetails property={property} />

                {/* Sidebar */}
                <aside className='space-y-4'>
                  <BookmarkButton property={property} />

                  <ShareButtons property={property} />
                  {/* Contact Form */}
                  <PropertyContactForm property={property} />
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  );
};

export default PropertyIdPage;
