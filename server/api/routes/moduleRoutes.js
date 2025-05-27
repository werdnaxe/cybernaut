import express from 'express';
import Module from '../models/moduleModel.js';

// To connect to database
import db from '../../db/conn.js';

const router = express.Router();

// Get all modules
router.get('/', async (req, res) => {
    const modules = await Module.find();

    if (!modules) res.send('No modules found').status(404);
    else res.send(modules).status(200);
})

// Get module by id
router.get('/:id', async (req, res) => {
    const module = await Module.findById(req.params.id);

    if (!module) res.send('Module not found').status(404);
    else res.send(module).status(200);
})

export default router;
