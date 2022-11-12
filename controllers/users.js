import { User } from "../models/users.js";

export const readAll = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const readById = (req, res) => {
  User.findOne({ _id: req.params.userId })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const create = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const edit = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
    });
};
