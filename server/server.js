import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import usersRouter from './api/routes/userRoutes.js';
import progressRouter from './api/routes/progressRoutes.js'
import modulesRouter from './api/routes/moduleRoutes.js';
import submodulesRouter from './api/routes/submoduleRoutes.js';
import quizzesRouter from './api/routes/quizRoutes.js';
import connectDB from './db/conn.js';
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// Mount all available routers
app.use('/api/users', usersRouter);
app.use('/api/progress', progressRouter);
app.use('/api/modules', modulesRouter);
app.use('/api/submodules', submodulesRouter);
app.use('/api/quizzes', quizzesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
