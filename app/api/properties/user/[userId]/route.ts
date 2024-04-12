import { connectDB } from '@/config/db';
import Property from '@/models/Property';

export const GET = async (
  req: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    await connectDB();

    const userId = params.userId;
    if (!userId) return new Response('User Id Not Found', { status: 400 });

    const properties = await Property.find({ owner: userId });

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
