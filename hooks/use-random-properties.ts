'use client';

import { getProperties } from '@/actions/get-properties';
import Property from '@/models/Property';

import { useEffect, useState } from 'react';

type RandomPropertiesProps = {
  properties: Property[] | undefined;
};

const useRandomProperties = () => {
  const [data, setData] = useState<RandomPropertiesProps | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProperties();
        const randomProperties = res.properties
          ? res.properties.sort(() => Math.random() - Math.random()).slice(0, 3)
          : [];
        if (!res) throw new Error('Failed to fetch properties');
        setData({ properties: randomProperties });
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

export default useRandomProperties;
