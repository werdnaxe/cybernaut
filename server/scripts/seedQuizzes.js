// This script seeds the database with lightweight quiz data and writes the quiz ID to a file for use in the seedModules.js script.

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Quiz from '../api/models/quizModel.js';

dotenv.config({path: '../config.env'});
const MONGO_URI = process.env.MONGO_URI;

async function seedQuizzes() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        // Create quiz data
        const quiz = await Quiz.create({
            questions: [
                {
                    question: 'What is datafication?',
                    order: 1,
                    answers: [
                        { answer: 'The process of turning social action into online quantified data', isCorrect: true },
                        { answer: 'The process of collecting data from social media', isCorrect: false },
                        { answer: 'The process of analyzing data', isCorrect: false },
                        { answer: 'The process of visualizing data', isCorrect: false }
                    ]
                },
                {
                    question: 'What is the main goal of datafication?',
                    order: 2,
                    answers: [
                        { answer: 'To create a digital footprint of individuals', isCorrect: false },
                        { answer: 'To understand and predict human behavior', isCorrect: true },
                        { answer: 'To collect as much data as possible', isCorrect: false },
                        { answer: 'To improve data storage techniques', isCorrect: false }
                    ]
                }
            ]
        })
        console.log('Quiz created:', quiz._id);

        // Write the quiz ID to a file so it can be used in seedModules.js
        fs.writeFileSync('quizId.txt', quiz._id.toString(), 'utf8');
        console.log('Quiz ID saved to quizId.txt');

        process.exit(0);

    } catch (err) {
        console.error('Error seeding quizzes:', err);
        process.exit(1);
    }
}

seedQuizzes();