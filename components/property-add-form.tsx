'use client';

import { AmenitiesList, initialProperty, PropertyTypes } from '@/lib/helper';
import { ImageType, Property } from '@/type';
import { Fragment, useEffect, useRef, useState } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { Button } from './ui/button';
import Image from 'next/image';
import ImagePreview from './form/image-preview';

const PropertyAddForm = () => {
  const [mounted, setMounted] = useState(false);
  const [fields, setFields] = useState<Property>(initialProperty);
  // const [filesUp, setFilesUp] = useState<any>([]);
  const { images } = fields;
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
      // console.log('Checkbox value:', (e.target as HTMLInputElement).checked);
      // console.log('Checkbox value:', e);
      const { value, checked } = e.target;

      // as {
      //   value: string;
      //   checked: boolean;
      // };

      // let fields = {
      //   amenities: [] as string[],
      // };

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
      // setFields((prev) => ({
      //   ...prev,
      //   amenities: checked
      //     ? [...prev.amenities, value]
      //     : prev.amenities.filter((amenity) => amenity !== value),
      // }));
    } else if (e.target instanceof HTMLSelectElement) {
      // console.log('Selected value:', (e.target as HTMLSelectElement).value);
      setFields((prev) => ({ ...prev, [name]: value }));
    } else if (
      e.target instanceof HTMLInputElement &&
      (e.target.type === 'text' || e.target.type === 'email')
    ) {
      // console.log('Input value:', (e.target as HTMLInputElement).value);

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
      // console.log('TextArea value:', (e.target as HTMLTextAreaElement).value);
      setFields((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (
      e.target instanceof HTMLInputElement &&
      (e.target.type === 'number' || e.target.type === 'tel')
    ) {
      // console.log('Input Number rates:', (e.target as HTMLInputElement).value);
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
      // console.log('Input File:', (e.target as HTMLInputElement).value);
      const { files } = e.target;
      if (!files || !files.length) return;

      if (!fields.images) return;

      const MAX_FILES_COUNT = 2;

      if (files.length > MAX_FILES_COUNT) {
        alert(`You can only select up to ${MAX_FILES_COUNT} files.`);
        return;
      }

      const updatedImages: string[] = [...fields.images];
      const filesArray = Array.from(files);
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
      }
      // if (filesArray.length > MAX_FILES_COUNT) {
      //   return alert('images files can not more than 2 ');
      // } else {
      //   for (const file of filesArray) {
      //     const reader = new FileReader();
      //     reader.onload = (e) => {
      //       if (e.target && e.target.result) {
      //         const imageURL = e.target.result as string;
      //         updatedImages.push(imageURL);
      //       }
      //       // setImages((prevState) => [...prevState, { file, previewURL, publicId: null }]);
      //       setFields((prev) => ({
      //         ...prev,
      //         images: updatedImages,
      //       }));
      //     };
      //     reader.readAsDataURL(file);
      //   }
      // }
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
        <div className='mb-4'>
          <label htmlFor='type' className='block text-gray-700 font-bold mb-2'>
            Property Type
          </label>
          <select
            id='type'
            name='type'
            className='border rounded w-full py-2 px-3'
            required
            defaultValue={fields.type}
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
            defaultValue={fields.name}
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
            defaultValue={fields.description}
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
            defaultValue={fields.location.street}
            onChange={handleChange}
          />
          <input
            type='text'
            id='city'
            name='location.city'
            className='border rounded w-full py-2 px-3 mb-2'
            placeholder='City'
            required
            defaultValue={fields.location.city}
            onChange={handleChange}
          />
          <input
            type='text'
            id='state'
            name='location.state'
            className='border rounded w-full py-2 px-3 mb-2'
            placeholder='State'
            required
            defaultValue={fields.location.state}
            onChange={handleChange}
          />
          <input
            type='text'
            id='zipcode'
            name='location.zipcode'
            className='border rounded w-full py-2 px-3 mb-2'
            placeholder='Zipcode'
            defaultValue={fields.location.zipcode}
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
              defaultValue={fields.beds}
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
              defaultValue={fields.baths}
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
              defaultValue={fields.square_feet}
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
            defaultValue={fields.seller_info.name}
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
            defaultValue={fields.seller_info.email}
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
            defaultValue={fields.seller_info.phone}
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
            {/* {!fields.images && <p>No Image!</p>}
          {fields.images &&
            fields.images.map((img, i) => (
              <Fragment key={img}>
                <Image
                  src={img}
                  alt='image prev'
                  width={80}
                  height={80}
                  className='rounded-md shadow-md  '
                />

                <Button
                  type='button'
                  variant='ghost'
                  size='icon'
                  onClick={() => removeImagePrev(i)}
                  className='relative m-0 p-0 w-0 h-0'
                >
                  <FaTimesCircle className='text-rose-500 absolute top-[1px] right-[4px]  rounded-full w-4 h-4 hover:text-rose-600 ' />
                </Button>
              </Fragment>
            ))} */}

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