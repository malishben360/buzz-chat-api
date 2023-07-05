import mongoose from 'mongoose';

export const connect = () => {
  // Promisify mongoose promise attribute and connect to the database.
  const MONGODB_URL: string = process.env.MONGODB_URI!;
  mongoose.Promise = Promise;
  mongoose.connect(MONGODB_URL);

  // Handle success connection.
  mongoose.connection.on('open', () => {
    console.log('Database connected');
  });
  // Handle failed connection.
  mongoose.connection.on('error', (error: Error) => {
    console.log('Database Error: ', error);
  });
};
