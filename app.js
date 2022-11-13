import express from 'express';
import mongoose from 'mongoose';
import { constants } from 'http2';
import bodyParser from 'body-parser';
import { usersRouter } from './routes/users.js';
import { cardsRouter } from './routes/cards.js';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '636f57bbe14e3b56f6a92eb1',
  };

  next();
});

app.use('/', usersRouter);
app.use('/', cardsRouter);

app.use('*', (req, res) => res
  .status(constants.HTTP_STATUS_NOT_FOUND)
  .send({ message: 'Страница не найдена' }));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
