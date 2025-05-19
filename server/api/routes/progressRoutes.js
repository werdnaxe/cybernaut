import express from 'express';
import Progress from '../models/progressModel.js';   // this will incorporate Mongoose functionality and replace MongoDB native driver

// To connect to database
import db from '../../db/conn.js';

const router = express.Router();

// Create user's progress document
router.post('/', async (req, res) => {
    try {
        const userProgress = await Progress.create(req.body);

        res.send(userProgress).status(204);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating user');
    }
})

// Get all user's progress
router.get('/', async (req, res) => {
    const progress = await Progress.find();

    if (!progress) res.send('No progress found').status(404);
    else res.send(progress).status(200);
})

// Get user's progress doc by id
router.get('/:id', async (req, res) => {
    const progress = await userProgress.findById(req.params.id);

    if (!progress) res.send('User not found').status(404);
    else res.send(progress).status(200);
})

// Update user's progress by id
router.put('/:id', async (req, res) => {
    const updatedProgress = await Progress.findByIdAndUpdate(req.params.id);

    if (!updatedProgress) res.send('User not found').status(404);
    else {
        updatedProgress.XP = req.body.XP;
        updatedProgress.lastSubmodulePerModule = req.body.lastSubmodulePerModule;
        await updatedProgress.save();
        console.log('User progress updated:', updatedProgress);
        res.send(updatedProgress).status(200);
    }        
})

// Delete user's progress doc by id
router.delete('/:id', async (req, res) => {
    const deletedProgress = await Progress.findByIdAndDelete(req.params.id);

    if (!deletedProgress) res.send('User not found').status(404);
    else {
        console.log('User progress deleted:', deletedProgress);
        res.send(deletedProgress).status(200);
    }
})

export default router;
