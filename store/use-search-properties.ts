import { useSearchStore } from './use-search-store';

export const useSearchProperties = () => {
  const {
    location,
    propertyType,
    searchText,
    setLocation,
    setPropertyType,
    setSearchText,
  } = useSearchStore();

  return {
    location,
    propertyType,
    searchText,
    setLocation,
    setPropertyType,
    setSearchText,
  };
};
