import { Joi, celebrate } from 'celebrate';
import { urlRegEx } from '../utils/utils.js';

export const celebrateUserCreate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegEx),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

export const celebrateUserEdit = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

export const celebrateUserAvatarEdit = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(urlRegEx),
  }),
});

export const celebrateUserId = celebrate({
  params: Joi.object({
    userId: Joi.string().hex().length(24).required(),
  }).required(),
});

export const celebrateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});
