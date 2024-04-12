import { OptionsType } from '@/type';

export const AmenitiesList = [
  'Wifi',
  'Full kitchen',
  'Washer & Dryer',
  'Free Parking',
  'Hot Tub',
  '24/7 Security',
  'Wheelchair Accessible',
  'Elevator Access',
  'Dishwasher',
  'Gym/Fitness Center',
  'Air Conditioning',
  'Balcony/Patio',
  'Smart TV',
  'Coffee Maker',
  'High-Speed Internet',
  'Outdoor Grill/BBQ',
  'Fireplace',
  'Beach Access',
  'Swimming Pool',
  'Hiking Trails Access',
  'Pet-Friendly',
  'Ski Equipment Storage',
  'Mountain View',
];

export const PropertyTypes = [
  'Apartment',
  'Condo',
  'House',
  'Cabin or Cottage',
  'Room',
  'Studio',
  'Capsule',
  'Villa',
  'Mansion',
  'Other',
];

export const PropertyOptions: { label: string; value: OptionsType }[] = [
  { value: OptionsType.All, label: 'All' },
  { value: OptionsType.Apartment, label: 'Apartment' },
  { value: OptionsType.Condo, label: 'Condo' },
  { value: OptionsType.House, label: 'House' },
  { value: OptionsType.Cabin_or_Cottage, label: 'Cabin or Cottage' },
  { value: OptionsType.Room, label: 'Room' },
  { value: OptionsType.Studio, label: 'Studio' },
  { value: OptionsType.Capsule, label: 'Capsule' },
  { value: OptionsType.Villa, label: 'Villa' },
  { value: OptionsType.Mansion, label: 'Mansion' },
  { value: OptionsType.Other, label: 'Other' },
];

export const SelectOptions = [
  'All',
  'Apartment',
  'Condo',
  'House',
  'Cabin or Cottage',
  'Room',
  'Studio',
  'Capsule',
  'Villa',
  'Mansion',
  'Other',
];

export const location = ['street', 'city', 'state', 'zipcode'];

export const bedBathSize = ['beds', 'baths', 'square_feet'];

export const priceRate = {
  weekly: 0 || '',
  monthly: 0 || '',
  nightly: 0 || '',
};

export const initialProperty = {
  name: '',
  type: '',
  description: '',
  location: {
    street: '',
    city: '',
    state: '',
    zipcode: '',
  },
  beds: '',
  baths: '',
  square_feet: '',
  amenities: [],
  rates: {
    nightly: '',
    weekly: '',
    monthly: '',
  },
  seller_info: {
    name: '',
    email: '',
    phone: '',
  },
  images: [],
};
