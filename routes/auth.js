import { Router } from 'express';
import { login, createUser } from '../controllers/users.js';

export const authRouter = Router();

authRouter.post('/signin', login);
authRouter.post('/signup', createUser);
