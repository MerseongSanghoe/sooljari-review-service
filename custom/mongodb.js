import mongoose from 'mongoose';

const connectToMongoDB = async () => {
  const connectionStr = (process.env.MONGODB_CONNECTION_STRING ?? '')
    .replace('{0}', process.env.MONGODB_INITDB_ROOT_USERNAME ?? '')
    .replace('{1}', process.env.MONGODB_INITDB_ROOT_PASSWORD ?? '');
  const fullUrl = `${connectionStr}:${process.env.MONGODB_PORT}`;
  console.log(`start mongodb connection`);
  await mongoose.connect(fullUrl);
  console.log(`mongodb connected, in ${mongoose.connection.host}`);
};

export { connectToMongoDB };
