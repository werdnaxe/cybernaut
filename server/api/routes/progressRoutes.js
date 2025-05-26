/* This file contains the routes for the progress API. Each call is tied to a specific user action. */

import express from 'express';
import Progress from '../models/progressModel.js';

// To connect to database
import db from '../../db/conn.js';

const router = express.Router();

// Create user's progress document
router.post('/', async (req, res) => {
    try {
        const { userID } = req.body;
        const userProgress = await Progress.create({ user: userID });
        res.send(userProgress).status(204);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating progress document');
    }
})

// Get all user's progress
router.get('/', async (res) => {
    const progress = await Progress.find();

    if (!progress) res.send('No user progress docs found').status(404);
    else res.send(progress).status(200);
})

// Get user's progress doc by user id
router.get('/:userID', async (req, res) => {
    const progress = await Progress.findOne({ user: req.params.userID });
    console.log('User progress:', progress);

    if (!progress) res.send('User progress not found').status(404);
    else res.send(progress).status(200);
})

// Update user's progress by user id
router.put('/:userID', async (req, res) => {
    const updatedProgress = await Progress.findOne({ user: req.params.userID });
    console.log('User progress:', updatedProgress);

    if (!updatedProgress) res.send('User progress not found').status(404);
    else {
        updatedProgress.XP = req.body.XP;
        updatedProgress.submodulePerModule = req.body.submodulePerModule;
        await updatedProgress.save();
        console.log('User progress updated:', updatedProgress);
        res.send(updatedProgress).status(200);
    }        
})

// Delete user's progress doc by id
router.delete('/:id', async (req, res) => {
    const deletedProgress = await Progress.findByIdAndDelete(req.params.id);

    if (!deletedProgress) res.send('User progress not found').status(404);
    else {
        console.log('User progress deleted:', deletedProgress);
        res.send(deletedProgress).status(200);
    }
})

export default router;
