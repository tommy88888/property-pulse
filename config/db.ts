import mongoose from 'mongoose';

let connected = false;

export const connectDB = async () => {
  mongoose.set('strictQuery', true);

  // If the database is already connected, don't connect again

  if (connected) {
    console.log('MongoBD is Connected...');
    return;
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (databaseUrl === undefined) throw new Error('Database url not found');

  try {
    await mongoose.connect(databaseUrl);
    connected = true;
    console.log('DATABASE Connected...');
  } catch (err: any) {
    console.error('Error connecting to MongoDB:', err);
  }
};
