import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import { constants } from 'http2';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { usersRouter } from './routes/users.js';
import { cardsRouter } from './routes/cards.js';
import { signRouter } from './routes/sign.js';
import { auth } from './middlewares/auth.js';
import { NotFoundError } from './utils/errors.js';

const { PORT = 3000 } = process.env;
export const dirname = path.dirname(fileURLToPath(import.meta.url));
const config = dotenv.config({ path: path.resolve(dirname, '.env.common') }).parsed;
if (!config) {
  throw new Error('Config not found');
}
config.NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.set('config', config);
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
  if (err.statusCode) res.status(err.statusCode).send({ message: err.message });
  else res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Неизвестная ошибка' });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
