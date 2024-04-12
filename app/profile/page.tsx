'use client';

import Spinner from '@/components/spinner';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import UserProperty from './user-property';
import Property from '@/models/Property';

type ProfilePageProps = {};

const ProfilePage = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserProperties = async (userId: string) => {
      if (!userId) return;

      try {
        const res = await fetch(`/api/properties/user/${userId}`, {
          cache: 'no-store',
        });

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    // fetch user properties when session is available
    if (session?.user?.id) {
      fetchUserProperties(session?.user?.id);
    }
  }, [session?.user?.id]);

  const handleDeleteProperty = async (property: Property) => {
    const { _id: id } = property;

    const confirmed = window.confirm(
      'Are you sure you want to delete this property? this action can not be undone. '
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: 'DELETE',
        cache: 'no-store',
      });
      if (res.status === 200) {
        const updatedProperties = properties.filter(
          (property) => property._id !== id
        );
        setProperties(updatedProperties);

        toast.success('Property Deleted');
      } else {
        toast.error('Failed to delete property');
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed to  delete property');
    }
  };

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Profile</h1>
          <div className='flex flex-col md:flex-row'>
            <div className='md:w-1/4 mx-20 mt-10'>
              <div className='mb-4'>
                <Image
                  className='h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0'
                  src={profileImage || '/profile.png'}
                  width={0}
                  height={0}
                  priority
                  sizes='100vw'
                  alt='User'
                />
              </div>
              <h2 className='text-2xl mb-4'>
                <span className='font-bold block'>Name: </span> {profileName}
              </h2>
              <h2 className='text-2xl'>
                <span className='font-bold block'>Email: </span> {profileEmail}
              </h2>
            </div>
            <div className='md:w-3/4 md:pl-4'>
              <h2 className='text-xl font-semibold mb-4'>Your Listings</h2>
              {!loading && properties.length === 0 && (
                <p>You have no property listings!</p>
              )}

              {loading ? (
                <Spinner loading={loading} />
              ) : (
                properties.map((property) => (
                  <UserProperty
                    key={property._id}
                    property={property}
                    handleDeleteProperty={handleDeleteProperty}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
