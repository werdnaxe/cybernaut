import express from 'express';
import Submodule from '../models/submoduleModel.js';

// To connect to database
import db from '../../db/conn.js';

const router = express.Router();

// Get all submodules
router.get('/', async (req, res) => {
    const submodules = await Submodule.find();

    if (!submodules) res.send('No submodules found').status(404);
    else res.send(submodules).status(200);
})

// Get submodule by id
router.get('/:id', async (req, res) => {
    const submodule = await Submodule.findById(req.params.id);

    if (!submodule) res.send('Submodule not found').status(404);
    else res.send(submodule).status(200);
})

export default router;
