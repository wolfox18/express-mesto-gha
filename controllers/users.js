import { constants } from 'http2';
import bcryptjs from 'bcryptjs';
import pkg from 'jsonwebtoken';
import { User } from '../models/users.js';

const { jwt } = pkg;

export const login = (req, res) => {
  const { email, password } = req.body;
  // console.log('email - ', email);
  // console.log('password - ', password);
  return User.findUserByCredentials(email, password)
    .then((user) => {
      console.log('user in controller - ', user);
      const token = jwt.sign({ _id: user._id });
      console.log('token - ', token);
      res.send({ token });
    })
    .catch(() => {
      res
        .status(constants.HTTP_STATUS_UNAUTHORIZED)
        .send({ message: 'Неправильные почта или пароль' });
    });
};

export const readAll = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: 'Ошибка прочтения пользователей' });
    });
};

export const readById = (req, res) => {
  User.findOne({ _id: req.params.userId })
    .then((user) => {
      if (user) res.send(user);
      else {
        res
          .status(constants.HTTP_STATUS_NOT_FOUND)
          .send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(constants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные' });
      } else {
        res
          .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: 'Ошибка поиска пользователя' });
      }
    });
};

export const createUser = (req, res) => {
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
          res
            .status(constants.HTTP_STATUS_BAD_REQUEST)
            .send({ message: 'Переданы некорректные данные' });
        } else {
          res
            .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
            .send({ message: 'Ошибка добавления пользователя' });
        }
      }));
};

export const edit = (req, res) => {
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
        res
          .status(constants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные' });
      } else {
        res
          .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: 'Ошибка обновления пользователя' });
      }
    });
};

export const editAvatar = (req, res) => {
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
        res
          .status(constants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные' });
      } else {
        res
          .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: 'Ошибка обновления пользователя' });
      }
    });
};
