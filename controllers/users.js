import { User } from "../models/users.js";
import { constants } from "http2";

export const readAll = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: "Ошибка прочтения пользователей" });
    });
};

export const readById = (req, res) => {
  User.findOne({ _id: req.params.userId })
    .then((user) => {
      if (user) res.send(user);
      else
        res
          .status(constants.HTTP_STATUS_NOT_FOUND)
          .send({ message: "Пользователь не найден" });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res
          .status(constants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: "Переданы некорректные данные" });
      } else if (err.name === "ReferenceError") {
        res
          .status(constants.HTTP_STATUS_NOT_FOUND)
          .send({ message: "Пользователь не найден" });
      } else {
        res
          .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: "Ошибка поиска пользователя" });
      }
    });
};

export const create = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(constants.HTTP_STATUS_CREATED).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res
          .status(constants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: "Переданы некорректные данные" });
      } else {
        res
          .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: "Ошибка добавления пользователя" });
      }
    });
};

export const edit = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ReferenceError") {
        res
          .status(constants.HTTP_STATUS_NOT_FOUND)
          .send({ message: "Пользователь не найден" });
      } else if (err.name === "ValidationError") {
        res
          .status(constants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: "Переданы некорректные данные" });
      } else {
        res
          .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: "Ошибка обновления пользователя" });
      }
    });
};

export const editAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ReferenceError") {
        res
          .status(constants.HTTP_STATUS_NOT_FOUND)
          .send({ message: "Пользователь не найден" });
      } else if (err.name === "ValidationError") {
        res
          .status(constants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: "Переданы некорректные данные" });
      } else {
        res
          .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: "Ошибка обновления пользователя" });
      }
    });
};
