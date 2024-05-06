import express, { Request, Response } from 'express';
import { userRouter } from './routes/user-route';
import { authRouter } from './routes/auth-router';
import cookieParser from "cookie-parser";

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/hello', async (req: Request, res: Response) => {
  res.send({ value: 'OK, db is connected' });
});

app.use('/users', userRouter);
app.use('/auth', authRouter);
