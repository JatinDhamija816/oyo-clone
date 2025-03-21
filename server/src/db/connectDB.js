import mongoose from 'mongoose';

/**
 * Establishes a connection to the MongoDB database.
 * Uses environment variables for configuration.
 */
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
      console.error(error); // Log full error in development mode
    }

    process.exit(1); // Exit process to avoid running in an unstable state
  }
};

// Gracefully close MongoDB connection on process termination When Press Ctrl + c
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🔴 MongoDB disconnected due to app termination.');
  process.exit(0);
});

export default connectDB;
