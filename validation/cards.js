import { Joi, celebrate } from 'celebrate';
import { urlRegEx } from '../utils/utils.js';

export const celebrateCardCreate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(urlRegEx).required(),
  }),
});

export const celebrateCardId = celebrate({
  params: Joi.object({
    cardId: Joi.string().hex().length(24).required(),
  }).required(),
});
