'use client';

import { useEffect, useState } from 'react';

type HydrationProps = {};

export const useHydration = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
};
