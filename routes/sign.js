import { Router } from 'express';
import { login, createUser } from '../controllers/users.js';
import { celebrateUserCreate, celebrateUserLogin } from '../validation/users.js';

export const signRouter = Router();

signRouter.post('/signin', celebrateUserLogin, login);
signRouter.post('/signup', celebrateUserCreate, createUser);
