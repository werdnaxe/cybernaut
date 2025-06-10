/* This script deletes all users from the database. */

import mongoose from 'mongoose';
import User from '../api/models/userModel.js';
import Progress from '../api/models/progressModel.js';
import dotenv from 'dotenv';
dotenv.config({path: '../.env'});
// Connect to the database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};
// Delete all users
const deleteAllUsers = async () => {
    try {
        await connectDB();
        const userResult = await User.deleteMany({});
        const progressResult = await Progress.deleteMany({});
        console.log(`Deleted ${userResult.deletedCount} users and ${progressResult.deletedCount} progress documents`);
    } catch (error) {
        console.error('Error deleting users and progress docs:', error);
    } finally {
        mongoose.connection.close();
    }
};
// Execute the delete function
deleteAllUsers()
    .then(() => console.log('User deletion completed'))
    .catch((error) => console.error('Error in user deletion process:', error));