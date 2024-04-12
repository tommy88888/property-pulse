import { connectDB } from '@/config/db';
import { getSessionUser } from '@/lib/get-session-user';
import Property from '@/models/Property';
import User from '@/models/User';

// export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is Required', { status: 401 });
    }
    const { userId } = sessionUser;

    const user = await User.findOne({ _id: userId });

    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });
    return new Response(JSON.stringify(bookmarks), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response('Something Went Wrong', {
      status: 500,
    });
  }
};

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

    let message;
    if (isBookmarked) {
      user.bookmarks.pull(propertyId);
      message = 'Bookmark removed successfully';
      isBookmarked = false;
    } else {
      user.bookmarks.push(propertyId);
      message = 'Bookmark added successfully';
      isBookmarked = true;
    }
    await user.save();

    return new Response(
      JSON.stringify({
        message,
        isBookmarked,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);

    return new Response('Something Went Wrong', {
      status: 500,
    });
  }
};
