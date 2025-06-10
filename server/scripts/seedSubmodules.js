// This script seeds the database with lightweight submodule data.

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Module from '../api/models/moduleModel.js';
import Submodule from '../api/models/submoduleModel.js';

dotenv.config({path: '../config.env'});
const MONGO_URI = process.env.MONGO_URI;

async function seedSubmodules() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Read the module ID from the file
    const moduleID = fs.readFileSync('moduleId.txt', 'utf8').trim();
    if (!moduleID) {
      throw new Error('Module ID not found in moduleId.txt');
    }

    // Find module just seeded
    const parentModule = await Module.findById(moduleID);
    if (!parentModule) {
        throw new Error('Module not found');
    }

    const submodules = await Submodule.insertMany([
        {
            name: 'Game 1',
            description: 'Description for Game 1',
            order: 1,
            module: parentModule._id
        },
        {
            name: 'Game 2',
            description: 'Description for Game 2',
            order: 2,
            module: parentModule._id
        },
        {
            name: 'Game 3',
            description: 'Description for Game 3',
            order: 3,
            module: parentModule._id
        }
    ]);

    console.log('Submodules created:', submodules);
    process.exit(0);

  } catch (err) {
    console.error('Error seeding submodules:', err);
    process.exit(1);
  }
}

seedSubmodules();
