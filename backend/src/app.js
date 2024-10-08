import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

export const app = express();

app.use(cors({
    origin: [process.env.CORS_ORIGIN],
    credentials: true,
}))

app.use(express.json("limit: 50mb"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());


import userRouter from './routes/user.routes.js';
app.use('/api/auth', userRouter);

import courseRouter from './routes/course.routes.js';
app.use('/api/courses', courseRouter);

import adminRouter from './routes/admin.routes.js';
app.use('/api/admin', adminRouter);