import express from 'express';
import User from '../models/userModel.js';   // this will incorporate Mongoose functionality and replace MongoDB native driver

// To connect to database
import db from '../../db/conn.js';

const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
    try {
        const createdUser = await User.create(req.body);
        
        res.send(createdUser).status(204);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating user');
    }
})

// Get all users
router.get('/', async (req, res) => {
    const user = await User.find();

    if (!user) res.send('No users found').status(404);
    else res.send(user.status(200));
})

// Get user by id
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) res.send('User not found').status(404);
    else res.send(user).status(200);
})

// Update user by id
router.put('/:id', async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id);

    if (!updatedUser) res.send('User not found').status(404);
    else {
        updatedUser.username = req.body.username;
        updatedUser.email = req.body.email;
        updatedUser.password = req.body.password;

        await updatedUser.save();
        console.log('User updated:', updatedUser);
        res.send(updatedUser).status(200);
    }
})

// Delete user by id
router.delete('/:id', async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) res.send('User not found').status(404);
    else {
        console.log('User deleted:', deletedUser);
        res.send(deletedUser).status(200);
    }
})

export default router;
