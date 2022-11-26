import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';

const userSchema = new Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: () => 'Введите корректный email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.static.findUserByCredentials = function findUserByCredentials(password, email) {
  return this.findOne(email)
    .select('+password')
    .then((document) => {
      if (!document) {
        throw new Error('Неправильные почта или пароль');
      }
      return bcryptjs.compare(password, document.password)
        .then((matched) => {
          if (!matched) {
            throw new Error('Неправильные почта или пароль');
          }
          const user = document.toObject();
          delete user.password;
          return user;
        });
    });
};

export const User = mongoose.model('user', userSchema);
