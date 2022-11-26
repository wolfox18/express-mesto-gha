import { Router } from 'express';
import { signin, signup } from '../controllers/users';

export const authRouter = Router();

authRouter.get('/signin', signin);
authRouter.post('/signup', signup);
