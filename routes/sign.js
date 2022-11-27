import { Router } from 'express';
import { login, createUser } from '../controllers/users.js';
import { celebrateUserCreate } from '../validation/users.js';

export const signRouter = Router();

signRouter.post('/signin', login);
signRouter.post('/signup', celebrateUserCreate, createUser);
