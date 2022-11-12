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

export const readById = () => {};

export const create = (req, res) => {
  const { name, about, avatar } = req.body;
  console.log(req);
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
    });
};
