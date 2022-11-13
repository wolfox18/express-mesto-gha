import { Router } from 'express';
import {
  readAll, deleteById, create, setLike, removeLike,
} from '../controllers/cards.js';

export const cardsRouter = Router();

cardsRouter.get('/cards', readAll);
cardsRouter.post('/cards', create);
cardsRouter.delete('/cards/:cardId', deleteById);
cardsRouter.put('/cards/:cardId/likes', setLike);
cardsRouter.delete('/cards/:cardId/likes', removeLike);
