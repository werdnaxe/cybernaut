import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import usersRouter from './api/routes/userRoutes.js';
import progressRouter from './api/routes/progressRoutes.js'
import authRouter from './api/routes/authRoutes.js';
import connectDB from './db/conn.js';
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// Mount all available routers
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/progress', progressRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
