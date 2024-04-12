import { connectDB } from '@/config/db';
import { getSessionUser } from '@/lib/get-session-user';

import User from '@/models/User';

// export const dynamic = 'force-dynamic';

// interface BookmarkRequest extends NextRequest {
//   json: () => Promise<{ propertyId: string }>;
// }

export const POST = async (req: Request) => {
  try {
    await connectDB();

    const { propertyId }: { propertyId: string } = await req.json();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is Required', { status: 401 });
    }

    const { userId } = sessionUser;

    const user = await User.findOne({ _id: userId });

    let isBookmarked = user.bookmarks.includes(propertyId);

    return new Response(
      JSON.stringify({
        isBookmarked,
      }),
      { status: 200 }
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
