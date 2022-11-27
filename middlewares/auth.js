import jwt from 'jsonwebtoken';
import { constants } from 'http2';
import { jwtKey } from '../utils/utils.js';

// eslint-disable-next-line consistent-return
export const auth = (req, res, next) => {
  const { authorization } = req.headers;
  console.log('authorization - ', authorization);
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(constants.HTTP_STATUS_UNAUTHORIZED)
      .send({ message: 'Необходима авторизация, нет bearer' });
  }

  const token = authorization.replace('Bearer ', '');
  console.log('token - ', token);
  let payload;

  try {
    payload = jwt.verify(token, jwtKey);
    console.log('payload - ', payload);
  } catch (err) {
    console.log(err);
    return res
      .status(constants.HTTP_STATUS_UNAUTHORIZED)
      .send({ message: 'Необходима авторизация, token не проходит' });
  }

  req.user = payload;
  next();
};
