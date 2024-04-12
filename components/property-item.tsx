'use server';

import { getProperties } from '@/actions/get-properties';
import PropertyCard from './property-card';

const PropertyItem = async () => {
  const properties = await getProperties();

  const randomProperties = properties
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);
  if (!randomProperties) return [];

  // const renderedRandomProperties = randomProperties.map(
  //   (property: Property) => (
  //     <PropertyCard key={property._id} property={property} />
  //   )
  // );

  // TODO: Check valid or not

  return <PropertyCard property={randomProperties} />;
};

export default PropertyItem;
