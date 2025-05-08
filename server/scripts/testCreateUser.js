import mongoose from 'mongoose';
import User from '../api/models/userModel.js';
import dotenv from 'dotenv';
dotenv.config({path: '../config.env'});

const MONGO_URI = process.env.MONGO_URI;

async function testCreateUser() {
    try {
        await mongoose.connect(MONGO_URI);

        const newUser = new User( {
            username: 'andrew',
            email: 'andrew123@example.com',
            password: 'password123',
            grade: 8,
        });

        const savedUser = await newUser.save();
        console.log('User created:', savedUser);
    } catch (error) {
        console.error('Error creating user:', error.message)
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

testCreateUser();
