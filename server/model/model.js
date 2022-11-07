const mongoose = require('mongoose');
const { Schema, model } = mongoose;
// const uniqueValidator = require('mongoose-unique-validator');
// const crypto = require('crypto');

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, 'product name is required'],
      match: [
        /^[a-zA-Z0-9_-]+$/gi,
        'User user name can not have special characters',
      ],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      //unique: [true, 'That email address is taken.'],
      unique: true,
      required: [true, 'email is required'],
      minLength: [5, 'user name must be more than 4 characters'],
      maxLength: [40, ' user name should be not more than 40 characters'],
      //validate: [validateEmail, 'Please fill a valid email address'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    gender: String,
    status: { type: String, enum: ['Inactive', 'Active'], default: 'Inactive' },
    // hash: String,
    // salt: String,
  },
  { collection: 'users' }
);

// userSchema.plugin(uniqueValidator, { message: 'is already taken.' });

/* UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
}; */
/* UserSchema.methods.validPassword = function (password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
  return this.hash === hash;
}; */

const UsersDB = model('users', userSchema);

module.exports = UsersDB;
