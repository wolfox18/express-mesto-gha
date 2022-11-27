import { Router } from 'express';
import {
  readAll, deleteById, create, setLike, removeLike,
} from '../controllers/cards.js';
import { celebrateCardCreate, celebrateCardId } from '../validation/cards.js';

export const cardsRouter = Router();

cardsRouter.get('/cards', readAll);
cardsRouter.post('/cards', celebrateCardCreate, create);
cardsRouter.delete('/cards/:cardId', celebrateCardId, deleteById);
cardsRouter.put('/cards/:cardId/likes', celebrateCardId, setLike);
cardsRouter.delete('/cards/:cardId/likes', celebrateCardId, removeLike);
