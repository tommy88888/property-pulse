import { connectDB } from '@/config/db';
import Property from '@/models/Property';
import User from '@/models/User';
import { Query } from '@/type';

export const dynamic = 'force-dynamic';

export const GET = async (req: Request) => {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const location = searchParams.get('location');
    const propertyType = searchParams.get('propertyType');

    if (!location) throw new Error('No location found');
    const locationPattern = new RegExp(location, 'i');

    let query: { $or: Query[]; type?: RegExp } = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { 'location.street': locationPattern },
        { 'location.city': locationPattern },
        { 'location.state': locationPattern },
        { 'location.zipcode': locationPattern },
      ],
    };

    if (propertyType && propertyType !== 'All') {
      const typePattern = new RegExp(propertyType, 'i');
      query.type = typePattern;
    }

    const properties = await Property.find(query).populate<{ owner: User }>(
      'owner',
      'username'
    );

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response('Something Went Wrong', {
      status: 500,
    });
  }
};
