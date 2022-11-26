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

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  console.log('Function findUserByCredentials started');
  console.log('email - ', email);
  console.log('this - ', this);
  return this.findOne({ email })
    .select('+password')
    .then((document) => {
      console.log('document - ', document);
      if (!document) {
        console.log('Do not found email');
        throw new Error('Неправильные почта или пароль');
      }
      return bcryptjs.compare(password, document.password)
        .then((matched) => {
          console.log('matched', matched);
          if (!matched) {
            console.log('Password doesnt match');
            throw new Error('Неправильные почта или пароль');
          }
          const user = document.toObject();
          delete user.password;
          console.log('user - ', user);
          return user;
        });
    });
};

export const User = mongoose.model('user', userSchema);
