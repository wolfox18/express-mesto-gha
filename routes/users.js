import { Router } from 'express';
import {
  readAll, readById, edit, editAvatar, readMe,
} from '../controllers/users.js';
import {
  celebrateUserEdit, celebrateUserAvatarEdit, celebrateUserId,
} from '../validation/users.js';

export const usersRouter = Router();

usersRouter.get('/users', readAll);
usersRouter.get('/users/me', readMe);
usersRouter.get('/users/:userId', celebrateUserId, readById);
usersRouter.patch('/users/me', celebrateUserEdit, edit);
usersRouter.patch('/users/me/avatar', celebrateUserAvatarEdit, editAvatar);
