import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import usersRouter from './api/routes/userRoutes.js';
import progressRouter from './api/routes/progressRoutes.js'
import authRouter from './api/routes/authRoutes.js';
import connectDB from './db/conn.js';
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',   // allow requests from client URL (Vite dev server)
  credentials: true,   // allow cookies to be sent with requests
}));
app.use(express.json());

// Mount all available routers
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/progress', progressRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
