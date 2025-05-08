import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({path: './config.env'});

const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB using Mongoose and log success or failure
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
