import { connectDB } from '@/config/db';

export const editProperty = async (id: string) => {
  try {
    await connectDB();
  } catch (err) {
    console.error(err);
    return null;
  }
};
