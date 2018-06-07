'use strict';

import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'petrobots' }],
});

userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch(err => {
      throw err;
    });
});

userSchema.pre('findOne', function (next) {
  this.populate('pets');
  next();
});

userSchema.statics.authenticate = function (auth) {
  let query = { username: auth.username };
  return this.findOne(query)
    .then(user => user && user.comparePassword(auth.password))
    .catch(err => err);
};

userSchema.statics.authorize = function (token) {
  let parsedToken = jwt.verify(token, process.env.SECRET || 'changethis');
  let query = { _id: parsedToken.id };
  return this.findOne(query)
    .then(user => {
      return user;
    })
    .catch(err => err);
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET || 'changethis');
};

export default mongoose.model('users', userSchema);