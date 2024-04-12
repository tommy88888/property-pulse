import { connectDB } from '@/config/db';
import { getSessionUser } from '@/lib/get-session-user';
import Message from '@/models/message';

export const dynamic = 'force-dynamic';

export const GET = async (req: Request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is Required', { status: 401 });
    }

    const { userId } = sessionUser;

    // const readMessages = await Message.find({ recipient: userId, read: true })
    //   .sort({ createdAt: -1 })
    //   .populate('sender', 'username')
    //   .populate('property', 'name');

    const count = await Message.countDocuments({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 })
      .populate('sender', 'username')
      .populate('property', 'name');

    // const messages = [...unreadMessages, ...readMessages];

    return new Response(JSON.stringify(count), {
      status: 200,
    });
  } catch (err) {
    console.log(err);

    return new Response('Something Went Wrong', {
      status: 500,
    });
  }
};
