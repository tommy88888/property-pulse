'use client';

import FeaturedProperties from '@/components/featured-properties';
import Hero from '@/components/hero';
import HomeProperty from '@/components/home-property';
import InfoBoxes from '@/components/info-boxes';
// import PropertyItem from '@/components/property-item';

export default function Home() {
  return (
    <div className='flex flex-col'>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperty />
    </div>
  );
}
