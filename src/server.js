import express from 'express';
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
const app = express();

app.use(express.json());
app.use('/auth', authRoutes)
app.use(userRoutes)

export default app;
