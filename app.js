import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import { usersRouter } from './routes/users.js';
import { cardsRouter } from './routes/cards.js';
import { signRouter } from './routes/sign.js';
import { auth } from './middlewares/auth.js';
import { NotFoundError } from './utils/errors.js';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

//  signin and signup route
app.use('/', signRouter);
//  authorisation route
app.use(auth);
app.use('/', usersRouter);
app.use('/', cardsRouter);

//  celebrate validation
app.use(errors());

//  page not found route
app.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

//  error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
