import { constants } from 'http2';
import { Card } from '../models/cards.js';
import {
  NotFoundError, InternalServerError, BadRequestError, ForbiddenError,
} from '../utils/errors.js';

export const create = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(constants.HTTP_STATUS_CREATED).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(new InternalServerError(err.message));
      }
    });
};

export const readAll = (req, res, next) => {
  Card.find({})
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      next(new InternalServerError(err.message));
    });
};

export const deleteById = (req, res, next) => {
  Card.findById({ _id: req.params.cardId })
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка не найдена'));
      } else if (card.owner.toString() !== req.user._id) {
        next(new ForbiddenError('Вы не можете удалить чужую карточку'));
      } else {
        return card.remove();
      }
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(new InternalServerError(err.message));
      }
    });
};

export const setLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) res.send(card);
      else {
        next(new NotFoundError('Карточка не найдена'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(new InternalServerError(err.message));
      }
    });
};

export const removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) res.send(card);
      else {
        next(new NotFoundError('Карточка не найдена'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(new InternalServerError(err.message));
      }
    });
};
