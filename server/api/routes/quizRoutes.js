import express from 'express';
import Quiz from '../models/quizModel.js';

// To connect to database
import db from '../../db/conn.js';

const router = express.Router();

// Get all quizzes
router.get('/', async (req, res) => {
    const quizzes = await Quiz.find();

    if (!quizzes) res.send('No quizzes found').status(404);
    else res.send(quizzes).status(200);
})

// Get quiz by id
router.get('/:id', async (req, res) => {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) res.send('Quiz not found').status(404);
    else res.send(quiz).status(200);
})

export default router;
