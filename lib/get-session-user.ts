import { auth } from '@/auth';

export const getSessionUser = async () => {
  try {
    const session = await auth();

    if (!session || !session.user) return null;

    return {
      user: session.user,
      userId: session.user.id,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};
