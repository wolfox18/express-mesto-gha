import { constants } from 'http2';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/users.js';
import { jwtKey } from '../utils/utils.js';
import {
  NotFoundError, UnauthorizedError, BadRequestError, ConflictError,
} from '../utils/errors.js';

export const readMe = (req, res, next) => {
  User.findById({ _id: req.user._id })
    .then((user) => {
      if (user) res.send(user);
      else {
        next(new NotFoundError('Пользователь не найден'));
      }
    })
    .catch(() => {
      next(new Error());
    });
};

export const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, jwtKey, { expiresIn: '1d' });
      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError('Неправильная почта или пароль'));
    });
};

export const readAll = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      next(new Error());
    });
};

export const readById = (req, res, next) => {
  User.findOne({ _id: req.params.userId })
    .then((user) => {
      if (user) res.send(user);
      else {
        next(new NotFoundError('Пользователь не найден'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Введены некорректные данные'));
      } else {
        next(new Error());
      }
    });
};

export const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcryptjs.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })
      .then((document) => {
        const user = document.toObject();
        delete user.password;
        res.status(constants.HTTP_STATUS_CREATED).send(user);
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError('Введены некорректные данные'));
        } else if (err.code === 11000) {
          next(new ConflictError('Пользователь с такой почтой уже существует'));
        } else {
          next(new Error());
        }
      }));
};

export const edit = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Введены некорректные данные'));
      } else {
        next(new Error());
      }
    });
};

export const editAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Введены некорректные данные'));
      } else {
        next(new Error());
      }
    });
};
