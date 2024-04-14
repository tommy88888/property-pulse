'use client';

import { AmenitiesList, initialProperty, PropertyTypes } from '@/lib/helper';
import { Property } from '@/type';
import { useEffect, useRef, useState } from 'react';

import { Button } from './ui/button';

import ImagePreview from './form/image-preview';
import Seller from './form/seller';
import Location from './form/location';
import BedBathSqFeet from './form/bed-bath-sq-feet';
import Type from './form/type';
import InputText from './form/input';
import { toast } from 'react-toastify';

// import SelectPropertyType from './form/select-property-type';

const PropertyAddForm = () => {
  const [mounted, setMounted] = useState(false);
  const [fields, setFields] = useState<Property>(initialProperty);
  useEffect(() => {
    setMounted(true);
  }, []);

  const imgRef = useRef<HTMLInputElement | null>(null);
  const handleChange = <
    T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >(
    e: React.ChangeEvent<T>
  ): void => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
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
      setFields((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (
      e.target instanceof HTMLInputElement &&
      (e.target.type === 'number' || e.target.type === 'tel')
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
      e.target instanceof HTMLInputElement &&
      e.target.type === 'file'
    ) {
      const { files } = e.target;
      if (!files || !files.length) return;

      if (!fields.images) return;

      const MAX_FILES_COUNT = 4;

      if (files.length > MAX_FILES_COUNT) {
        toast.error(`You can only select up to ${MAX_FILES_COUNT} files.`);
        clear();
        return;
      }

      const updatedImages: string[] = [...fields.images];
      const filesArray = Array.from(files);
      if (filesArray.length > MAX_FILES_COUNT) clear();
      for (
        let i = 0;
        i < filesArray.length && updatedImages.length < MAX_FILES_COUNT;
        i++
      ) {
        const file = filesArray[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && e.target.result) {
            const imageURL = e.target.result as string;
            updatedImages.push(imageURL);
            setFields((prev) => ({
              ...prev,
              images: updatedImages,
            }));
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const removeImagePrev = (img: string) => {
    if (!fields.images) throw new Error('error');

    const filteredImages = fields.images.filter((image) => image !== img);
    setFields((prev) => ({
      ...prev,
      images: filteredImages,
    }));
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

  return (
    mounted && (
      <form
        action='/api/properties'
        method='POST'
        encType='multipart/form-data'
      >
        <h2 className='text-3xl text-center font-semibold mb-6'>
          Add Property
        </h2>

        <Type type={fields.type} handleChange={handleChange} />

        <InputText
          label='Listing Name'
          name='name'
          type='text'
          id='name'
          defaultValue={fields.name}
          placeholder='eg. Beautiful Apartment In Miami'
          className='border rounded w-full py-2 px-3 mb-2'
          handleChange={handleChange}
        />

        <InputText
          label='Description'
          name='description'
          type='textarea'
          id='description'
          rows={4}
          defaultValue={fields.description}
          placeholder='Add an optional description of your property'
          className='border rounded w-full py-2 px-3 mb-2'
          handleChange={handleChange}
        />
        <Location location={fields.location} handleChange={handleChange} />

        <BedBathSqFeet
          beds={fields.beds}
          baths={fields.baths}
          square_feet={fields.square_feet}
          handleChange={handleChange}
        />

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
                  checked={fields.amenities.includes(amen)}
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
            {Object.entries(fields.rates).map(([key, value]) => (
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
                  defaultValue={value}
                  className='border rounded w-full py-2 px-3'
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        </div>

        <Seller seller_info={fields.seller_info} handleChange={handleChange} />

        <div className='mb-4'>
          <label
            htmlFor='images'
            className='block text-gray-700 font-bold mb-2'
          >
            Images (Select up to 4 images)
          </label>
          <div className='w-18 h-18 flex flex-wrap  gap-1 rounded-md shadow-md  '>
            {!fields.images && <p>No Image!</p>}
            {fields.images?.map((img, i) => (
              <ImagePreview
                key={i}
                images={fields.images || []}
                image={img}
                onRemove={() => removeImagePrev(img)}
              />
            ))}
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
          <span>{fields?.images?.length} file(s) selected </span>
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

        <div>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Add Property
          </button>
        </div>
      </form>
    )
  );
};

export default PropertyAddForm;
