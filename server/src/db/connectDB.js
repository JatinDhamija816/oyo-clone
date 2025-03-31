import mongoose from 'mongoose';
import { CONFIG } from '../utils/config.js';

const connectDB = async () => {
  try {
    if (!CONFIG.MONGO_URI) {
      throw new Error('Missing MONGO_URI in config.');
    }

    const connectionInstance = await mongoose.connect(CONFIG.MONGO_URI);

    console.log(
      `MongoDB connected successfully → Database: "${connectionInstance.connection.name}" @ Host: "${connectionInstance.connection.host}"`
    );
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);

    if (CONFIG.NODE_ENV !== 'production') {
      console.error(error);
    }

    process.exit(1);
  }
};

const gracefulShutdown = async (signal) => {
  console.log(`🔴 Received ${signal}, closing MongoDB connection...`);
  await mongoose.connection.close();
  console.log('🔴 MongoDB disconnected.');
  process.exit(0);
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

export default connectDB;
