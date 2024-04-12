import cloudinary from '@/config/cloudinary';
import { connectDB } from '@/config/db';
import { getSessionUser } from '@/lib/get-session-user';
import Message from '@/models/message';
import Property from '@/models/Property';

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const { id } = params;

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is Required', { status: 401 });
    }

    const { userId } = sessionUser;

    const message = await Message.findById(id);
    if (!message)
      return new Response('Property does not exist', { status: 404 });

    if (message.recipient.toString() !== userId)
      return new Response('Unauthorized', { status: 401 });

    message.read = !message.read;

    await message.save();

    return new Response(JSON.stringify(message), {
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
    const { id } = params;

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is Required', { status: 401 });
    }

    const { userId } = sessionUser;

    const message = await Message.findById(id);
    if (!message)
      return new Response('Property does not exist', { status: 404 });

    if (message.recipient.toString() !== userId)
      return new Response('Unauthorized', { status: 401 });

    // message.read = !message.read;

    await message.deleteOne();

    return new Response('message deleted', {
      status: 200,
    });
  } catch (err) {
    console.log(err);

    return new Response('Something Went Wrong', {
      status: 500,
    });
  }
};
