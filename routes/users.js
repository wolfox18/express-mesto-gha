import { Router } from 'express';
import {
  readAll, readById, edit, editAvatar,
} from '../controllers/users.js';

export const usersRouter = Router();

usersRouter.get('/users', readAll);
usersRouter.get('/users/:userId', readById);
usersRouter.patch('/users/me', edit);
usersRouter.patch('/users/me/avatar', editAvatar);
