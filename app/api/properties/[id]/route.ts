import cloudinary from '@/config/cloudinary';
import { connectDB } from '@/config/db';
import { getSessionUser } from '@/lib/get-session-user';
import Property from '@/models/Property';
// import { NextRequest } from 'next/server';

// export const dynamic = 'force-dynamic';

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const property = await Property.findById(params.id);
    if (!property) return new Response('Property Not Found!', { status: 404 });

    return Response.json(property, {
      status: 200,
    });
  } catch (err) {
    console.log(err);

    return new Response('Something Went Wrong', {
      status: 500,
    });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();

    // const { id } = params;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId)
      return new Response('User ID not Found', { status: 401 });

    const { userId } = sessionUser;

    const property = await Property.findById(params.id);

    if (!property) return new Response('Property Not Found!', { status: 404 });
    if (property.owner.toString() !== userId)
      return new Response('Unauthorized', { status: 401 });

    if (property.images.length > 0)
      for (const imageUrl of property.images) {
        const publicId = imageUrl.split('/').slice(-2).join('/').split('.')[0];
        await cloudinary.uploader.destroy(publicId, (err: any, res: any) => {});
      }

    await property.deleteOne();

    return Response.json('property deleted', {
      status: 200,
    });
  } catch (err) {
    console.log(err);

    return new Response('Something Went Wrong', {
      status: 500,
    });
  }
};

type PropertyLocation = {
  street: string;
  city: string;
  state: string;
  zipcode: string;
};

type PropertyRates = {
  weekly: number | undefined;
  monthly: number | undefined;
  nightly: number | undefined;
};

type PropertySellerInfo = {
  name: string;
  email: string;
  phone: string;
};

type PropertyData = {
  type: string;
  name: string;
  description: string;
  location: PropertyLocation;
  beds: number | undefined;
  baths: number | undefined;
  square_feet: number | undefined;
  amenities: string[] | undefined; // Assuming amenities can have any structure for now
  rates: PropertyRates;
  seller_info: PropertySellerInfo;
  owner: string; // Assuming owner is a string (user ID)
  images: File[] | undefined; // Array of File objects or undefined
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is Required', { status: 401 });
    }

    const { id } = params;
    const { userId } = sessionUser;

    const formData = await req.formData();

    const amenities = formData.getAll('amenities');

    const existingProperty = await Property.findById(id);
    if (!existingProperty)
      return new Response('Property does not exist', { status: 404 });

    if (existingProperty.owner.toString() !== userId)
      return new Response('Unauthorized', { status: 401 });

    const images: File[] = formData
      .getAll('images')
      .filter((image) => image !== '')
      .map((image) => {
        if (!(image instanceof File)) {
          throw new Error('Invalid Image file');
        }
        return image;
      });

    let imageSize;
    for (const file of images) {
      if (file instanceof File) {
        console.log(file.size); // Logs the size of the file
        imageSize = file.size;
      }
    }

    if (imageSize === 0) {
      let propertyData = {
        type: formData.get('type') as string,
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        location: {
          street: formData.get('location.street') as string,
          city: formData.get('location.city') as string,
          state: formData.get('location.state') as string,
          zipcode: formData.get('location.zipcode') as string,
        },
        beds: formData.get('beds')
          ? parseInt(formData.get('beds') as string)
          : undefined,
        baths: formData.get('baths')
          ? parseInt(formData.get('baths') as string)
          : undefined,
        square_feet: formData.get('square_feet')
          ? parseInt(formData.get('square_feet') as string)
          : undefined,
        amenities: amenities as string[],
        rates: {
          weekly: formData.get('rates.weekly')
            ? parseFloat(formData.get('rates.weekly') as string)
            : undefined,
          monthly: formData.get('rates.monthly')
            ? parseFloat(formData.get('rates.monthly') as string)
            : undefined,
          nightly: formData.get('rates.nightly')
            ? parseFloat(formData.get('rates.nightly') as string)
            : undefined,
        },
        seller_info: {
          name: formData.get('seller_info.name') as string,
          email: formData.get('seller_info.email') as string,
          phone: formData.get('seller_info.phone') as string,
        },
        owner: userId,
      };
      const updatedProperty = await Property.findByIdAndUpdate(
        id,
        propertyData
      );

      return new Response(JSON.stringify(updatedProperty), {
        status: 200,
      });
    } else {
      let propertyData: PropertyData = {
        type: formData.get('type') as string,
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        location: {
          street: formData.get('location.street') as string,
          city: formData.get('location.city') as string,
          state: formData.get('location.state') as string,
          zipcode: formData.get('location.zipcode') as string,
        },
        beds: formData.get('beds')
          ? parseInt(formData.get('beds') as string)
          : undefined,
        baths: formData.get('baths')
          ? parseInt(formData.get('baths') as string)
          : undefined,
        square_feet: formData.get('square_feet')
          ? parseInt(formData.get('square_feet') as string)
          : undefined,
        amenities: amenities as string[],
        rates: {
          weekly: formData.get('rates.weekly')
            ? parseFloat(formData.get('rates.weekly') as string)
            : undefined,
          monthly: formData.get('rates.monthly')
            ? parseFloat(formData.get('rates.monthly') as string)
            : undefined,
          nightly: formData.get('rates.nightly')
            ? parseFloat(formData.get('rates.nightly') as string)
            : undefined,
        },
        seller_info: {
          name: formData.get('seller_info.name') as string,
          email: formData.get('seller_info.email') as string,
          phone: formData.get('seller_info.phone') as string,
        },
        owner: userId,
        images: imageSize === 0 ? [] : images,
      };
      if (existingProperty.images.length > 0)
        for (const imageUrl of existingProperty.images) {
          const publicId = imageUrl
            .split('/')
            .slice(-2)
            .join('/')
            .split('.')[0];
          await cloudinary.uploader.destroy(publicId, (err: any, res: any) =>
            console.log(err, res)
          );
        }
      // Upload images to Cloudinary
      const imageUploadPromises = [];
      // const imageUploadPromises = images.map(async (image) => {
      for (const image of images) {
        if (image instanceof Blob) {
          const imageBuffer = await image.arrayBuffer();
          const imageArray = Array.from(new Uint8Array(imageBuffer));
          const imageData = Buffer.from(imageArray);

          const imageBase64 = imageData.toString('base64');

          const result = await cloudinary.uploader.upload(
            `data:image/png;base64,${imageBase64}`,
            {
              folder: 'property',
            }
          );
          console.log('image result:', result);
          // return result.secure_url;
          imageUploadPromises.push(result.secure_url);

          const uploadedImages = await Promise.all(imageUploadPromises);

          propertyData.images = uploadedImages as any;
        }
      }

      const updatedProperty = await Property.findByIdAndUpdate(
        id,
        propertyData
      );

      return new Response(JSON.stringify(updatedProperty), {
        status: 200,
      });
    }
  } catch (err) {
    console.log(err);

    return new Response('Something Went Wrong', {
      status: 500,
    });
  }
};
