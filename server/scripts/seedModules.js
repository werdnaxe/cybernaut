// This script seeds the database with lightweight module data and saves the quiz ID to a file for use in seedSubmodules.js.

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Module from '../api/models/moduleModel.js';
import Quiz from '../api/models/quizModel.js';

dotenv.config({path: '../config.env'});
const MONGO_URI = process.env.MONGO_URI;

async function seedModules() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Read the quiz ID from the file
    const quizID = fs.readFileSync('quizId.txt', 'utf8').trim();
    if (!quizID) {
      throw new Error('Quiz ID not found in quizId.txt');
    }

    // Use existing quiz ID to seed into module
    const moduleQuiz = await Quiz.findById(quizID);
    if (!moduleQuiz) {
      throw new Error('Quiz not found');
    }

    // Populate module data
    const module = {
      name: 'Data Detox Pit',
      description: 'An interactive module that teaches users about datafication and its implications.',
      quiz: moduleQuiz?._id   // use the quiz ID from the quiz created in seedQuizzes.js
    };

    // Create the module and save it to the database
    const createdModule = await Module.create(module);
    console.log('Module created:', createdModule);

    // Save the module ID to a file for use in seedSubmodules.js
    fs.writeFileSync('moduleId.txt', createdModule._id.toString(), 'utf8');
    console.log('Module ID saved to moduleId.txt');

    process.exit(0);
  } catch (err) {
    console.error('Error seeding module:', err);
    process.exit(1);
  }
}

seedModules();
