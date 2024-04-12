'use client';

import { getProperties } from '@/actions/get-properties';
import Property from '@/models/Property';

import { useEffect, useState } from 'react';

type RandomPropertiesProps = {
  properties: Property[] | undefined;
  total: number;
};

type Props = {
  createdAt: string | number | Date;
};

const useSortProperties = () => {
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
          ? res.properties.sort(
              (a: Props, b: Props) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
          : [];
        if (!res) throw new Error('Failed to fetch properties');
        // const newRes = randomProperties.map((props: Property) => ({
        //   ...props,
        //   ownerName: props.owner?.username ?? 'Unknown User',
        // }));
        setData({ properties: randomProperties, total: res.totalProperties });
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

export default useSortProperties;
