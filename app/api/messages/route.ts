import { UserProfile } from '@/components/property-contact-form';
import { connectDB } from '@/config/db';
import { getSessionUser } from '@/lib/get-session-user';
import Message from '@/models/message';

// export const dynamic = 'force-dynamic';

// interface Props extends UserProfile {
//   property: Property;
//   recipient: string;
// }

export const GET = async () => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user)
      return new Response(
        JSON.stringify({ message: 'You Must be logged in to send a message' }),
        { status: 401 }
      );

    const { userId } = sessionUser;

    const readMessages = await Message.find({ recipient: userId, read: true })
      .sort({ createdAt: -1 })
      .populate('sender', 'username')
      .populate('property', 'name');

    const unreadMessages = await Message.find({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 })
      .populate('sender', 'username')
      .populate('property', 'name');

    const messages = [...unreadMessages, ...readMessages];

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response('Something went wrong', { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    await connectDB();
    // if (!email && !phone && !message && !property && !recipient) return null;

    const { name, email, phone, message, property, recipient }: any =
      await req.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user)
      return new Response(
        JSON.stringify({ message: 'You Must be logged in to send a message' }),
        { status: 401 }
      );

    const { user } = sessionUser;

    if (user.id === recipient)
      return new Response(
        JSON.stringify({ message: 'Can not send a message to yourself' }),
        { status: 400 }
      );
    const newMessage = new Message({
      sender: user.id,
      recipient,
      property,
      name,
      email,
      phone,
      body: message,
    });

    await newMessage.save();
    return new Response(JSON.stringify({ message: 'Message sent' }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response('Something went wrong', { status: 500 });
  }
};
