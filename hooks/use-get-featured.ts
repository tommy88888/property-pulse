'use client';

import { getProperties } from '@/actions/get-properties';
import Property from '@/models/Property';

import { useEffect, useState } from 'react';

type FeaturedPropertiesProps = {
  properties: Property[] | undefined;
};

const useFeaturedProperties = () => {
  const [data, setData] = useState<FeaturedPropertiesProps | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProperties({
          showFeatured: true,
        });
        if (!res) throw new Error('Failed to fetch properties');
        setData({ properties: res });
      } catch (err) {
        console.error('error fetching data', err);
        setError('Failed');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return isLoading || error ? undefined : data;
};

export default useFeaturedProperties;
