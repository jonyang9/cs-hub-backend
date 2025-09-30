import 'dotenv/config'
import express from 'express';
import mongoose from 'mongoose';
const app = express();

mongoose.connect(process.env.MONGO_URI)
app.use(express.json());
// import routes

export default app;
