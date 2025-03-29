import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('Missing MONGODB_URI in environment variables.');
    }

    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);

    console.log(
      `🟢 MongoDB connected successfully → Database: "${connectionInstance.connection.name}" @ Host: "${connectionInstance.connection.host}"`
    );
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);

    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }

    process.exit(1);
  }
};

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🔴 MongoDB disconnected due to app termination.');
  process.exit(0);
});

export default connectDB;
