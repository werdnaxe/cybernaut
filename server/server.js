import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './api/routes/userRoutes.js';
dotenv.config();
import connectDB from './db/conn.js';
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// Mount user router
app.use('/api/users', usersRouter);   // NOTE: '/api/users' needs to match client-side API calls

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
