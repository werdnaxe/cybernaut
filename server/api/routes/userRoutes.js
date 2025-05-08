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

// Get user by id
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) res.send('User not found').status(404);
    else res.send(user).status(200);
})

export default router;
