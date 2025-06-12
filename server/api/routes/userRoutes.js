import express from 'express';
import User from '../models/userModel.js';   // this will incorporate Mongoose functionality and replace MongoDB native driver
import bcrypt from 'bcrypt';

// To connect to database
import db from '../../db/conn.js';
import authenticateToken from '../authMiddleware.js';

const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
    try {
        // First, check if username or email are already taken
        const existingUser = await User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.email }
            ]
        });

        // If so, alert user
        if (existingUser) {
            return res.status(400).send('Username or email already taken');
        }

        // Hash password before storing in database
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;

        // Create a new user and store in database
        const createdUser = await User.create(req.body);
        res.send(createdUser).status(204);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating user');
    }
});

// Get user by id
router.get('/:id', authenticateToken, async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) res.send('User not found').status(404);
    else res.send(user).status(200);
});

// Update username by id
router.put('/:id/username', authenticateToken, async (req, res) => {
    const username = req.body.username;
    const user = await User.findById(req.params.id);
    
    console.log('Incoming username:', username);
    // First, check if username already taken
    if (await User.findOne({ username })) return res.status(400).send('Username already taken');

    // Update username and save to DB
    user.username = username;
    const updatedUser = await user.save();

    // Remove password field before returning user data
    const userObj = updatedUser.toObject();
    const { password, ...updatedUserWithoutPassword } = userObj;

    console.log('Username updated:', updatedUserWithoutPassword);
    res.status(200).send(updatedUserWithoutPassword);
});

// Update password by id
router.put('/:id/password', authenticateToken, async (req, res) => {
    const newPassword = req.body.password;
    const user = await User.findById(req.params.id);

    // Hash new password before updating
    user.password = await bcrypt.hash(newPassword, 10);
    const updatedUser = await user.save();
    console.log('Password updated:', updatedUser);

    // Remove password field before returning user data
    const userObj = updatedUser.toObject();
    const { password, ...updatedUserWithoutPassword } = userObj;

    res.status(200).send(updatedUserWithoutPassword);
});

// Delete user by id
router.delete('/:id', authenticateToken, async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) res.send('User not found').status(404);
    else {
        console.log('User deleted:', deletedUser);
        res.send(deletedUser).status(200);
    }
});

export default router;
