import { Rates, SellerInfo, Location, OptionsType } from '@/type';
import { Schema, model, models, Document, Types } from 'mongoose';

interface Owner {
  _id?: Types.ObjectId;
  username?: string;
}

type Property = Document & {
  _id?: string;
  owner?: Owner;
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
  images: string[];
  is_featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

const PropertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipcode: {
        type: String,
      },
    },

    beds: {
      type: Number,
      required: true,
    },
    baths: {
      type: Number,
      required: true,
    },
    square_feet: {
      type: Number,
      required: true,
    },
    amenities: [
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
    ],
    rates: {
      nightly: {
        type: Number,
        required: true,
        default: '',
      },
      weekly: {
        type: Number,
        required: true,
        default: '',
      },
      monthly: {
        type: Number,
        required: true,
        default: '',
      },
    },
    seller_info: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    images: [
      {
        type: String,
      },
    ],
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Property = models.Property || model<Property>('Property', PropertySchema);

export default Property;
