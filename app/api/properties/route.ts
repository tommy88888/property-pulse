import cloudinary from '@/config/cloudinary';
import { connectDB } from '@/config/db';
import { getSessionUser } from '@/lib/get-session-user';

import Property from '@/models/Property';
import User from '@/models/User';

// export const dynamic = 'force-dynamic';

export const GET = async (req: Request) => {
  try {
    await connectDB();

    const url = new URL(req.url);
    const page = url.searchParams.get('page')
      ? Number(url.searchParams.get('page'))
      : 1;
    const pageSize = url.searchParams.get('pageSize')
      ? Number(url.searchParams.get('pageSize'))
      : 6;

    const skip = (page - 1) * pageSize;

    const totalProperties = await Property.countDocuments({});
    const properties = await Property.find({})
      .skip(skip)
      .limit(pageSize)
      .populate<{ owner: User }>('owner', 'username')
      .orFail();
    // .then((doc) => {
    // });

    const result = {
      totalProperties,
      properties,
    };

    // const propertyOwner = properties.map((prop) => ({
    //   ...prop,
    //   ownerUsername: prop.owner?.username ?? 'Unknown User',
    // }));

    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new Response('Something Went Wrong', {
      status: 500,
    });
  }
};

// interface MyPostRequest extends NextRequest {
//   formData: () => any;
// }

export const POST = async (req: Request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is Required', { status: 401 });
    }

    const { userId } = sessionUser;

    const formData = await req.formData();

    const amenities = formData.getAll('amenities');
    const images = formData.getAll('images').filter((image) => image !== '');
    const propertyData = {
      type: formData.get('type'),
      name: formData.get('name'),
      description: formData.get('description'),
      location: {
        street: formData.get('location.street'),
        city: formData.get('location.city'),
        state: formData.get('location.state'),
        zipcode: formData.get('location.zipcode'),
      },
      beds: formData.get('beds'),
      baths: formData.get('baths'),
      square_feet: formData.get('square_feet'),
      amenities,
      rates: {
        weekly: formData.get('rates.weekly'),
        monthly: formData.get('rates.monthly'),
        nightly: formData.get('rates.nightly'),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      owner: userId,
      images,
    };
    // Upload images to Cloudinary
    const imageUploadPromises = [];

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

        imageUploadPromises.push(result.secure_url);

        const uploadedImages = await Promise.all(imageUploadPromises);
        propertyData.images = uploadedImages;
      }
    }

    const newProperty = new Property(propertyData);
    await newProperty.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
      // `${process.env.NEXTAUTH_URL}/properties/add`
    );

    // return new Response(JSON.stringify({ message: 'Success' }), {
    //   status: 200,
    // });
  } catch (err) {
    console.log(err);

    return new Response('Something Went Wrong', {
      status: 500,
    });
  }
};
