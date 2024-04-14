'use client';

import { getProperty } from '@/actions/get-property';
import LoadingPage from '@/app/loading';
import {
  PropertyTypes,
  AmenitiesList,
  priceRate,
  initialProperty,
} from '@/lib/helper';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, Fragment, useRef } from 'react';
import { toast } from 'react-toastify';
import ImagePicker from './form/image-picker';
import Image from 'next/image';
import { FaTimesCircle } from 'react-icons/fa';
import { Button } from './ui/button';
import { Property } from '@/type';
import { clear } from 'console';
import ImagePreview from './form/image-preview';
// import Property from '@/models/Property';

type ParamsProps = {
  id: string;
};

const PropertyEditForm = () => {
  const { id } = useParams<ParamsProps>();

  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  const [fields, setFields] = useState<Property>(initialProperty);
  const [loading, setLoading] = useState(false);
  const [filesCount, setFilesCount] = useState<number | undefined>(
    fields?.images?.length || undefined
  );

  const imgRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setMounted(true);
    const fetchPropertyData = async () => {
      try {
        const propertyData = await getProperty(id);
        if (propertyData && propertyData.rates) {
          const defaultRates = { ...propertyData.rates };
          for (const rate in defaultRates) {
            if (defaultRates[rate] === undefined) {
              defaultRates[rate] = '';
            }
          }
          propertyData.rates = defaultRates;
        }
        setFields(propertyData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [id]);
  const handleChange = <
    T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >(
    e: React.ChangeEvent<T>
  ): void => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      // console.log('Checkbox value:', (e.target as HTMLInputElement).checked);
      // console.log('Checkbox value:', e);
      const { value, checked } = e.target;

      if (!value) {
        return undefined;
      }

      const updatedAmen = [...fields.amenities];
      if (checked) {
        updatedAmen.push(value);
      } else {
        const i = updatedAmen.indexOf(value);

        if (i !== -1) {
          updatedAmen.splice(i, 1);
        }
      }
      setFields((prev) => ({
        ...prev,
        amenities: updatedAmen,
      }));
    } else if (e.target instanceof HTMLSelectElement) {
      console.log('Selected value:', (e.target as HTMLSelectElement).value);
      setFields((prev) => ({ ...prev, [name]: value }));
    } else if (
      e.target instanceof HTMLInputElement &&
      (e.target.type === 'text' || e.target.type === 'email')
    ) {
      if (name.includes('.')) {
        const [outerKey, innerKey] = name.split('.');
        setFields((prev: any) => ({
          ...prev,
          [outerKey]: {
            ...prev[outerKey],
            [innerKey]: value,
          },
        }));
      } else {
        setFields((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else if (
      e.target instanceof HTMLTextAreaElement &&
      e.target.type === 'textarea'
    ) {
      console.log('TextArea value:', (e.target as HTMLTextAreaElement).value);
      setFields((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (
      e.target instanceof HTMLInputElement &&
      (e.target.type === 'number' || e.target.type === 'tel')
    ) {
      console.log('Input Number rates:', (e.target as HTMLInputElement).value);
      if (name.includes('.')) {
        const [outerKey, innerKey] = name.split('.');
        setFields((prev: any) => ({
          ...prev,
          [outerKey]: {
            ...prev[outerKey],
            [innerKey]: value,
          },
        }));
      } else {
        setFields((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else if (
      e.target instanceof HTMLInputElement &&
      e.target.type === 'file'
    ) {
      console.log('Input File:', e.target.files);

      const files = e.target.files;
      if (!files || !files) throw new Error('No files found');

      if (!fields.images) return;

      let updatedImages = [...fields.images];
      const filesArray = Array.from(files);
      for (const file of filesArray) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && e.target.result) {
            const imageURL = e.target.result as string;

            updatedImages.push(imageURL);
          }
          setFields((prev) => ({
            ...prev,
            images: updatedImages,
          }));
        };
        reader.readAsDataURL(file);
      }
      // setFields((prev) => ({
      //   ...prev,
      //   images: updatedImages,
      // }));
    }
  };
  const removeImagePrev = (img: string) => {
    if (!fields.images) throw new Error('error');

    const filteredImages = fields.images.filter((image, i) => image !== img);
    setFields((prev) => ({
      ...prev,
      images: filteredImages,
    }));

    // setFilesCount((prev) => (prev === undefined || prev <= 0 ? 0 : prev - 1));
    if (filteredImages.length < 0) setFilesCount(0);
    setFilesCount(filteredImages.length);
    if (imgRef.current) console.log(imgRef.current.files);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const res = await fetch(`/api/properties/${id}`, {
        method: 'PUT',
        body: formData,
      });
      if (res.status === 200) {
        router.push(`/properties/${id}`);
      } else if (res.status === 401 || res.status === 403) {
        toast.error('Permission denied');
      } else {
        toast.error('Something went wrong!');
      }
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong!');
    }
  };

  const clear = () => {
    if (imgRef.current) {
      imgRef.current.value = '';
    }
    setFields((prev) => ({
      ...prev,
      images: [],
    }));
  };

  if (loading) return <LoadingPage loading={loading} />;

  return (
    mounted &&
    !loading && (
      <form onSubmit={(e) => handleSubmit(e)} encType='multipart/form-data'>
        <h2 className='text-3xl text-center font-semibold mb-6'>
          Edit Property
        </h2>
        <div className='mb-4'>
          <label htmlFor='type' className='block text-gray-700 font-bold mb-2'>
            Property Type
          </label>
          <select
            id='type'
            name='type'
            className='border rounded w-full py-2 px-3'
            required
            value={(fields && fields.type) || undefined}
            onChange={handleChange}
          >
            {PropertyTypes.map((type, i) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 font-bold mb-2'>
            Listing Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className='border rounded w-full py-2 px-3 mb-2'
            placeholder='eg. Beautiful Apartment In Miami'
            required
            defaultValue={fields && fields.name}
            onChange={handleChange}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='description'
            className='block text-gray-700 font-bold mb-2'
          >
            Description
          </label>
          <textarea
            id='description'
            name='description'
            className='border rounded w-full py-2 px-3'
            rows={4}
            placeholder='Add an optional description of your property'
            defaultValue={fields && fields.description}
            onChange={handleChange}
          />
        </div>
        <div className='mb-4 bg-blue-50 p-4'>
          <label className='block text-gray-700 font-bold mb-2'>Location</label>
          <input
            type='text'
            id='street'
            name='location.street'
            className='border rounded w-full py-2 px-3 mb-2'
            placeholder='Street'
            defaultValue={fields && fields.location.street}
            onChange={handleChange}
          />
          <input
            type='text'
            id='city'
            name='location.city'
            className='border rounded w-full py-2 px-3 mb-2'
            placeholder='City'
            required
            defaultValue={fields && fields.location.city}
            onChange={handleChange}
          />
          <input
            type='text'
            id='state'
            name='location.state'
            className='border rounded w-full py-2 px-3 mb-2'
            placeholder='State'
            required
            defaultValue={fields && fields.location.state}
            onChange={handleChange}
          />
          <input
            type='text'
            id='zipcode'
            name='location.zipcode'
            className='border rounded w-full py-2 px-3 mb-2'
            placeholder='Zipcode'
            defaultValue={fields && fields.location.zipcode}
            onChange={handleChange}
          />
        </div>
        <div className='mb-4 flex flex-wrap'>
          <div className='w-full sm:w-1/3 pr-2'>
            <label
              htmlFor='beds'
              className='block text-gray-700 font-bold mb-2'
            >
              Beds
            </label>
            <input
              type='number'
              id='beds'
              name='beds'
              className='border rounded w-full py-2 px-3'
              required
              defaultValue={fields && fields.beds}
              onChange={handleChange}
            />
          </div>
          <div className='w-full sm:w-1/3 px-2'>
            <label
              htmlFor='baths'
              className='block text-gray-700 font-bold mb-2'
            >
              Baths
            </label>
            <input
              type='number'
              id='baths'
              name='baths'
              className='border rounded w-full py-2 px-3'
              required
              defaultValue={fields && fields.baths}
              onChange={handleChange}
            />
          </div>
          <div className='w-full sm:w-1/3 pl-2'>
            <label
              htmlFor='square_feet'
              className='block text-gray-700 font-bold mb-2'
            >
              Square Feet
            </label>
            <input
              type='number'
              id='square_feet'
              name='square_feet'
              className='border rounded w-full py-2 px-3'
              required
              defaultValue={fields && fields.square_feet}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 font-bold mb-2'>
            Amenities
          </label>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
            {AmenitiesList.map((amen) => (
              <div key={amen}>
                <input
                  type='checkbox'
                  id={
                    amen.includes('/')
                      ? `amenity_${amen.replace(/\//g, '_').toLowerCase()}`
                      : `amenity_${amen}`
                  }
                  name='amenities'
                  value={amen}
                  className='mr-2 '
                  checked={fields && fields.amenities.includes(amen)}
                  onChange={handleChange}
                />
                <label
                  htmlFor={
                    amen.includes('/')
                      ? `amenity_${amen.replace(/\//g, '_').toLowerCase()}`
                      : `amenity_${amen}`
                  }
                  className='text-xs '
                >
                  {amen}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className='mb-4 bg-blue-50 p-4'>
          <label className='block text-gray-700 font-bold mb-2'>
            Rates (Leave blank if not applicable)
          </label>
          <div className='flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>
            {!fields?.rates ? (
              <p>No Data!</p>
            ) : (
              Object.entries(fields && fields.rates).map(([key, value]) => (
                <div key={key} className='flex items-center'>
                  <label htmlFor='weekly_rate' className='mr-2'>
                    {key}
                  </label>
                  <input
                    min={0}
                    max={99999}
                    type='number'
                    id={`${key}_rate`}
                    name={`rates.${key}`}
                    defaultValue={value || ''}
                    className='border rounded w-full py-2 px-3'
                    onChange={handleChange}
                  />
                </div>
              ))
            )}
          </div>
        </div>
        <div className='mb-4'>
          <label
            htmlFor='seller_name'
            className='block text-gray-700 font-bold mb-2'
          >
            Seller Name
          </label>
          <input
            type='text'
            id='seller_name'
            name='seller_info.name'
            className='border rounded w-full py-2 px-3'
            placeholder='Name'
            defaultValue={fields && fields.seller_info.name}
            onChange={handleChange}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='seller_email'
            className='block text-gray-700 font-bold mb-2'
          >
            Seller Email
          </label>
          <input
            type='email'
            id='seller_email'
            name='seller_info.email'
            className='border rounded w-full py-2 px-3'
            placeholder='Email address'
            required
            defaultValue={fields && fields.seller_info.email}
            onChange={handleChange}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='seller_phone'
            className='block text-gray-700 font-bold mb-2'
          >
            Seller Phone
          </label>
          <input
            type='tel'
            id='seller_phone'
            name='seller_info.phone'
            className='border rounded w-full py-2 px-3'
            placeholder='Phone'
            defaultValue={fields && fields.seller_info.phone}
            onChange={handleChange}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='images'
            className='block text-gray-700 font-bold mb-2'
          >
            Images (Select up to 4 images)
          </label>
          <div className='w-18 h-18 flex flex-wrap  gap-1 rounded-md shadow-md  '>
            {!fields?.images ? (
              <p>No Image!</p>
            ) : (
              // fields.images &&
              // fields.images.map((img, i) => (
              //   <Fragment key={i}>
              //     <Image
              //       src={img}
              //       alt='image prev'
              //       width={80}
              //       height={80}
              //       className='rounded-md shadow-md  '
              //     />
              //     <Button
              //       type='button'
              //       variant='ghost'
              //       size='icon'
              //       onClick={() => removeImagePrev(img)}
              //       className='relative m-0 p-0 w-0 h-0 '
              //     >
              //       <FaTimesCircle className='text-rose-500 absolute top-[1px] right-[4px]  rounded-full w-4 h-4 hover:text-rose-600 ' />
              //     </Button>
              //   </Fragment>
              // ))
              fields.images?.map((img, i) => (
                <ImagePreview
                  key={i}
                  images={fields.images || []}
                  image={img}
                  onRemove={() => removeImagePrev(img)}
                />
              ))
            )}
          </div>
          <input
            ref={imgRef}
            type='file'
            id='images'
            name='images'
            className='border rounded w-full py-2 px-3'
            accept='image/*'
            multiple
            onChange={handleChange}
          />
          <span>{filesCount} file(s) selected </span>
          <span
            className={fields.images?.length === 0 ? 'hidden' : 'shadow-sm'}
          >
            <Button
              disabled={fields?.images?.length === 0}
              type='button'
              variant='destructive'
              size='sm'
              onClick={clear}
              className='text-xs h-3 p-2 m-0'
            >
              {fields.images && fields.images?.length > 1
                ? 'clear images'
                : 'clear image'}
            </Button>
          </span>
        </div>
        {/* <ImagePicker
        label='image picker'
        name='images'
        id='image-picker'
        max={4}
      /> */}
        <div>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Update Property
          </button>
        </div>
      </form>
    )
  );
};

export default PropertyEditForm;
