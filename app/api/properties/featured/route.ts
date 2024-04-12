import { connectDB } from '@/config/db';
import { getSessionUser } from '@/lib/get-session-user';
import Property from '@/models/Property';

export const GET = async () => {
  try {
    await connectDB();

    const properties = await Property.find({
      is_featured: true,
    });

    // const propertyOwner = properties.map((prop) => ({
    //   ...prop,
    //   ownerUsername: prop.owner?.username ?? 'Unknown User',
    // }));

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new Response('Something Went Wrong', {
      status: 500,
    });
  }
};
