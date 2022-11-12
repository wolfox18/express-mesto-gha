import { Card } from "../models/cards.js";

export const create = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const readAll = (req, res) => {
  Card.find({})
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteById = (req, res) => {
  Card.findByIdAndRemove({ _id: req.params.cardId })
    .then(() => {
      console.log("Card deleted");
      res.status(200).send({});
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      console.log(err);
    });
};
