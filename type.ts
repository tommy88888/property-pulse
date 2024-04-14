export type Location = {
  street: string;
  city: string;
  state: string;
  zipcode: string;
};

export type Rates = {
  nightly: number | string;
  weekly: number | string;
  monthly: number | string;
};

export type TypeProps = {
  All: string;
  Apartment: string;
  Condo: string;
  House: string;
  Cabin_or_Cottage: string;
  Room: string;
  Studio: string;
  Capsule: string;
  Villa: string;
  Mansion: string;
  Other: string;
};

export type SellerInfo = {
  name: string;
  email: string;
  phone: string;
};

export type Property = {
  _id?: string;
  owner?: string;
  name: string;
  type: string;
  description: string;
  location: Location;
  beds: number | string;
  baths: number | string;
  square_feet: number | string;
  amenities: string[];
  rates: Rates;
  seller_info: SellerInfo;
  images?: string[];
  is_featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type ClassNameProps = {
  className: string;
};

export type FileProps = {
  lastModified: number | string;
  name: string;
  size: number | string;
  type: string;
  webkitRelativePath: string;
};

export enum OptionsType {
  All = 'All',
  Apartment = 'Apartment',
  Condo = 'Condo',
  House = 'House',
  Cabin_or_Cottage = 'Cabin or Cottage',
  Room = 'Room',
  Studio = 'Studio',
  Capsule = 'Capsule',
  Villa = 'Villa',
  Mansion = 'Mansion',
  Other = 'Other',
}

export type Query =
  | { name: RegExp }
  | { description: RegExp }
  | { 'location.street': RegExp }
  | { 'location.city': RegExp }
  | { 'location.state': RegExp }
  | { 'location.zipcode': RegExp };

export type ImageType = {
  file: File;
  previewURL: string | null;
  publicId: string | null;
};

export type UserProps = {
  email: string;
  username: string;
  image: string;
  bookmarks: string[];
};

export type ContactFormProps = {
  name: string;
  email: string;
  message: string;
  phone: string;
  wasSubmitted: boolean;
};
