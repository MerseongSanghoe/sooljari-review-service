import mongoose from "mongoose";

const connectToMongoDB = async () => {
  const fullUrl = `${process.env.MONGODB_CONNECTION_STRING}:${process.env.MONGODB_PORT}`;
  console.log(`start mongodb connection`);
  await mongoose.connect(fullUrl);
  console.log(`mongodb connected, in ${mongoose.connection.host}`);
}

export {
	connectToMongoDB
}
